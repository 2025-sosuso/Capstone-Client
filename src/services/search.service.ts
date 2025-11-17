import api from "@/lib/axios";
import type {Comment} from "@/types/video.types";
import type {
    VideoSearchResponse,
    ShortsSearchResponse,
    SearchStatus,
    TrendingSearch,
    TrendingSearchResponse
} from "@/types/search.types";
import type {ChannelSearchResult} from "@/types/channel.types";

/**
 * 채널 검색
 */
export const searchChannels = async (query: string): Promise<ChannelSearchResult[]> => {
    const res = await api.get("/search/channels", {
        params: {query},
    });
    return res.data.data;
};

/**
 * 동영상 검색 (쇼츠 제외)
 */
export const searchVideos = async (query: string, pageToken?: string): Promise<VideoSearchResponse> => {
    const res = await api.get("/search/videos", {
        params: {
            query,
            ...(pageToken && {pageToken}),
        },
    });
    return res.data.data;
};

/**
 * 쇼츠 검색
 */
export const searchShorts = async (query: string, pageToken?: string): Promise<ShortsSearchResponse> => {
    const res = await api.get("/search/shorts", {
        params: {
            query,
            ...(pageToken && {pageToken}),
        },
    });
    return res.data.data;
};

export const fetchFilteredComments = async ({
                                                videoId,
                                                q,
                                                sentiment,
                                                keyword,
                                            }: {
    videoId: string;
    q?: string;
    sentiment?: 'positive' | 'negative' | 'other';
    keyword?: string;
}): Promise<Comment[]> => {
    console.log("[API 호출됨]", {videoId, q, sentiment, keyword});
    const params = q ? {q} : sentiment ? {sentiment} : keyword ? {keyword} : {};
    const res = await api.get(`/videos/${videoId}/comments`, {params});
    return res.data.data.results;
};


export const getTrendingSearch = async (): Promise<TrendingSearch> => {
    const res = await api.get<TrendingSearchResponse>("/trending-search");

    const data = res.data.data[0];

    return {
        updateAt: data.updateAt,
        items: data.items.map(item => ({
            rank: item.rank,
            keyword: item.keyword,
            status: item.status as SearchStatus
        }))
    };
};