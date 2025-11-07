import {useState, useEffect, useMemo} from "react";
import {useRouter} from "next/navigation";
import {searchByQuery} from "@/services/search.service";
import {VideoSummaryItem, ChannelSearchResult} from "@/types";
import {MOCK_VIDEOS} from "@components/search/mock";

type TabType = 'all' | 'video' | 'shorts' | 'channel';

const convertMockToVideoSummaryItem = (mockVideo: typeof MOCK_VIDEOS[0]): VideoSummaryItem => ({
    video: {
        id: mockVideo.id,
        title: mockVideo.title,
        description: '',
        publishedAt: mockVideo.publishedAt,
        thumbnailUrl: mockVideo.thumbnailUrl,
        viewCount: mockVideo.viewCount,
        likeCount: mockVideo.likeCount,
        commentCount: mockVideo.commentCount,
        scrapId: null,
    },
    channel: {
        id: `channel_${mockVideo.id}`,
        title: mockVideo.channelName,
        thumbnailUrl: mockVideo.thumbnailUrl,
        subscriberCount: 100000,
        favoriteChannelId: null,
    },
    analysis: {
        summary: mockVideo.summary || '',
        sentimentDistribution: {
            POSITIVE: mockVideo.sentiment.positive,
            NEGATIVE: mockVideo.sentiment.negative,
            OTHER: mockVideo.sentiment.other,
        },
        keywords: mockVideo.keywords,
    },
});

export function useSearchQuery(query: string | null, activeTab: TabType) {
    const router = useRouter();
    const [channels, setChannels] = useState<ChannelSearchResult[] | null>(null);
    const [videos, setVideos] = useState<VideoSummaryItem[]>([]);
    const [shorts, setShorts] = useState<VideoSummaryItem[]>([]);
    const [searchType, setSearchType] = useState<string>("");
    const [loading, setLoading] = useState({
        channels: false,
        videos: false,
        shorts: false,
    });

    const mockVideos = useMemo(() => MOCK_VIDEOS.map(convertMockToVideoSummaryItem), []);
    const topThreeVideos = useMemo(() => mockVideos.slice(0, 3), [mockVideos]);
    const topFourShorts = useMemo(() => mockVideos.slice(0, 4), [mockVideos]);

    useEffect(() => {
        if (!query || activeTab !== 'all') return;

        let mounted = true;
        setLoading({channels: true, videos: true, shorts: true});

        console.log('🔵 [통합 탭] 검색 시작:', query);

        searchByQuery(query)
            .then((result) => {
                if (!mounted) return;
                console.log('✅ [통합 탭] 백엔드 응답:', result);
                setSearchType(result.searchType);

                if (result.searchType === "URL") {
                    const apiVideoId = result.results?.[0]?.apiVideoId;

                    if (apiVideoId) {
                        console.log('✅ [통합 탭] URL 검색 - apiVideoId:', apiVideoId);
                        console.log('🚀 [통합 탭] 리다이렉트:', `/videos/${apiVideoId}`);
                        router.replace(`/videos/${apiVideoId}`);
                    } else {
                        console.error('❌ [통합 탭] apiVideoId 없음:', result);
                    }
                } else if (result.searchType === "CHANNEL") {
                    console.log('✅ [통합 탭] 채널 검색 - 결과 수:', result.results.length);
                    setChannels(result.results);
                }
            })
            .catch((error) => {
                console.error("❌ [통합 탭] 검색 실패:", error);
            })
            .finally(() => {
                if (!mounted) return;
                setLoading((prev) => ({...prev, channels: false}));
            });

        const videoTimer = window.setTimeout(() => {
            if (!mounted) return;
            setVideos(topThreeVideos);
            setLoading((prev) => ({...prev, videos: false}));
        }, 300);

        const shortsTimer = window.setTimeout(() => {
            if (!mounted) return;
            setShorts(topFourShorts);
            setLoading((prev) => ({...prev, shorts: false}));
        }, 500);

        return () => {
            mounted = false;
            clearTimeout(videoTimer);
            clearTimeout(shortsTimer);
        };
    }, [query, activeTab, router, topThreeVideos, topFourShorts]);

    useEffect(() => {
        if (!query || activeTab !== 'video') return;

        let mounted = true;
        setLoading({channels: false, videos: true, shorts: false});

        const timer = window.setTimeout(() => {
            if (!mounted) return;
            setVideos(mockVideos);
            setLoading((prev) => ({...prev, videos: false}));
        }, 300);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [query, activeTab, mockVideos]);

    useEffect(() => {
        if (!query || activeTab !== 'shorts') return;

        let mounted = true;
        setLoading({channels: false, videos: false, shorts: true});

        const timer = window.setTimeout(() => {
            if (!mounted) return;
            setShorts(mockVideos);
            setLoading((prev) => ({...prev, shorts: false}));
        }, 300);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [query, activeTab, mockVideos]);

    useEffect(() => {
        if (!query || activeTab !== 'channel') return;

        let mounted = true;
        setLoading({channels: true, videos: false, shorts: false});

        searchByQuery(query)
            .then((result) => {
                if (!mounted) return;
                if (result.searchType === "CHANNEL") {
                    setChannels(result.results);
                }
            })
            .catch((error) => {
                console.error("❌ [채널 탭] 검색 실패:", error);
            })
            .finally(() => {
                if (!mounted) return;
                setLoading((prev) => ({...prev, channels: false}));
            });

        return () => {
            mounted = false;
        };
    }, [query, activeTab]);

    return {
        channels,
        videos,
        shorts,
        searchType,
        loading,
    };
}