import {FavoriteChannelData} from '@/types/main.types';
import {VideoSummaryItem} from '@/types/video-preview.types';
import {ChannelSearchResult, FavoriteChannel} from '@/types/channel.types';

const API_BASE = 'https://knu-sosuso.com/api/main';

async function fetchNoStore(input: RequestInfo, init?: RequestInit) {
    return fetch(input, {credentials: 'include', cache: 'no-store', ...init});
}

/** 공통: 4xx를 “정상 흐름”으로 처리할지 여부 */
function isBenign4xx(status: number) {
    return status === 400 || status === 401 || status === 403 || status === 404;
}

/**
 * 관심 채널 데이터 조회
 * - 400/401/403/404: null (정상 흐름)
 * - 네트워크/5xx: 콘솔 error 후 null
 */
export async function fetchFavoriteChannelVideo(): Promise<FavoriteChannelData | null> {
    try {
        const res = await fetchNoStore(`${API_BASE}/favorite-channels`);

        if (isBenign4xx(res.status)) {
            console.debug('[FavoriteChannels] benign 4xx:', res.status);
            return null;
        }
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            console.error('[FavoriteChannels] http error:', res.status, res.statusText, text.slice(0, 200));
            return null;
        }

        const json: {
            data?: {
                favoriteChannelList?: FavoriteChannel[];
                videoSummary?: {
                    video: VideoSummaryItem['video'];
                    channel: VideoSummaryItem['channel'];
                    analysis: VideoSummaryItem['analysis'];
                } | null;
            };
        } = await res.json();

        const favoriteChannelList = json.data?.favoriteChannelList ?? [];
        const videoSummary = json.data?.videoSummary ?? null;

        if (!Array.isArray(favoriteChannelList) || favoriteChannelList.length === 0) {
            return null;
        }

        const channels: ChannelSearchResult[] = favoriteChannelList.map((c: FavoriteChannel) => ({
            id: c.apiChannelId,
            title: c.apiChannelName,
            handle: '',
            description: '',
            thumbnailUrl: c.apiChannelThumbnail,
            subscriberCount: 0,
            favoriteChannelId: c.favoriteChannelId,
        }));

        const latestVideo: VideoSummaryItem | null = videoSummary
            ? {
                video: {...videoSummary.video, scrapId: null},
                channel: {...videoSummary.channel, favoriteChannelId: null},
                analysis: videoSummary.analysis,
            }
            : null;

        return {channels, latestVideo};
    } catch (e) {
        console.error('[FavoriteChannels] network/parse error:', e);
        return null;
    }
}

/**
 * 스크랩 영상 조회
 * - 400/401/403/404: [] (정상 흐름)
 * - 네트워크/5xx: 콘솔 error 후 []
 */
export async function fetchScrapVideos(): Promise<VideoSummaryItem[]> {
    try {
        const res = await fetchNoStore(`${API_BASE}/scraps`);

        if (isBenign4xx(res.status)) {
            console.debug('[ScrapVideos] benign 4xx:', res.status);
            return [];
        }
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            console.error('[ScrapVideos] http error:', res.status, res.statusText, text.slice(0, 200));
            return [];
        }

        const json: { data?: VideoSummaryItem[] } = await res.json();
        const list = json?.data ?? [];

        return list.map((item) => ({
            video: {...item.video, scrapId: null},
            channel: {...item.channel, favoriteChannelId: null},
            analysis: item.analysis,
        }));
    } catch (e) {
        console.error('[ScrapVideos] network/parse error:', e);
        return [];
    }
}

/**
 * 인기 급상승 영상 조회
 * - 실패 시 콘솔 error 후 [] (홈 안정성 유지)
 */
export async function fetchTrendingVideos(): Promise<VideoSummaryItem[]> {
    try {
        const res = await fetchNoStore(`${API_BASE}/trending`);

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            console.error('[TrendingVideos] http error:', res.status, res.statusText, text.slice(0, 200));
            return [];
        }

        const json: { data?: VideoSummaryItem[] } = await res.json();
        const list = json?.data ?? [];

        return list.map((item) => ({
            video: {...item.video, scrapId: null},
            channel: {...item.channel, favoriteChannelId: null},
            analysis: item.analysis,
        }));
    } catch (e) {
        console.error('[TrendingVideos] network/parse error:', e);
        return [];
    }
}
