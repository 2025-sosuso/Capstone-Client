import {useState, useEffect, useCallback} from "react";
import {useRouter} from "next/navigation";
import {searchChannels, searchVideos, searchShorts} from "@/services/search.service";
import type {VideoSummaryItem, ChannelSearchResult, AnalysisSummaryOnly} from "@/types";
import {useAIPolling} from "@/hooks/useAIPolling";

type TabType = 'all' | 'video' | 'shorts' | 'channel';

interface SearchState {
    channels: ChannelSearchResult[] | null;
    videos: VideoSummaryItem[];
    shorts: VideoSummaryItem[];
    loading: {
        channels: boolean;
        videos: boolean;
        shorts: boolean;
    };
    videoPagination: {
        nextPageToken: string | null;
        hasMore: boolean;
    };
    shortsPagination: {
        nextPageToken: string | null;
        hasMore: boolean;
    };
}

const initialState: SearchState = {
    channels: null,
    videos: [],
    shorts: [],
    loading: {channels: false, videos: false, shorts: false},
    videoPagination: {nextPageToken: null, hasMore: false},
    shortsPagination: {nextPageToken: null, hasMore: false},
};

export function useSearchQuery(query: string | null, activeTab: TabType) {
    const router = useRouter();
    const [state, setState] = useState<SearchState>(initialState);

    // AI 폴링 업데이트 콜백
    const handleVideoAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setState((prev) => ({
            ...prev,
            videos: prev.videos.map((item) =>
                item.video.id === videoId ? { ...item, analysis } : item
            ),
        }));
    }, []);

    const handleShortsAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setState((prev) => ({
            ...prev,
            shorts: prev.shorts.map((item) =>
                item.video.id === videoId ? { ...item, analysis } : item
            ),
        }));
    }, []);

    useAIPolling(state.videos, handleVideoAIUpdate);
    useAIPolling(state.shorts, handleShortsAIUpdate);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setState({
                channels: null,
                videos: [],
                shorts: [],
                loading: {channels: true, videos: true, shorts: true}, // 백그라운드 로딩
                videoPagination: {nextPageToken: null, hasMore: false},
                shortsPagination: {nextPageToken: null, hasMore: false},
            });

            if (activeTab === 'all') {
                console.log('🔍 [All Tab] 검색 시작:', query);

                const [channelResult, videoResult, shortsResult] = await Promise.allSettled([
                    searchChannels(query),
                    searchVideos(query),
                    searchShorts(query),
                ]);

                setState((prev) => {
                    const newState = {...prev, loading: {channels: false, videos: false, shorts: false}};

                    if (channelResult.status === 'fulfilled') {
                        newState.channels = channelResult.value;
                    }

                    if (videoResult.status === 'fulfilled') {
                        newState.videos = videoResult.value.results;
                        newState.videoPagination = {
                            nextPageToken: videoResult.value.nextPageToken,
                            hasMore: videoResult.value.hasMore,
                        };
                    }

                    if (shortsResult.status === 'fulfilled') {
                        newState.shorts = shortsResult.value.results;
                        newState.shortsPagination = {
                            nextPageToken: shortsResult.value.nextPageToken,
                            hasMore: shortsResult.value.hasMore,
                        };
                    }

                    return newState;
                });
            } else if (activeTab === 'video') {
                console.log('🔍 [Video Tab] 검색 시작:', query);

                try {
                    const result = await searchVideos(query);
                    setState((prev) => ({
                        ...prev,
                        videos: result.results,
                        videoPagination: {
                            nextPageToken: result.nextPageToken,
                            hasMore: result.hasMore,
                        },
                        loading: {...prev.loading, videos: false},
                    }));
                } catch (error) {
                    console.error("❌ [Video Tab] 실패:", error);
                    setState((prev) => ({...prev, loading: {...prev.loading, videos: false}}));
                }
            } else if (activeTab === 'shorts') {
                console.log('🔍 [Shorts Tab] 검색 시작:', query);

                try {
                    const result = await searchShorts(query);
                    setState((prev) => ({
                        ...prev,
                        shorts: result.results,
                        shortsPagination: {
                            nextPageToken: result.nextPageToken,
                            hasMore: result.hasMore,
                        },
                        loading: {...prev.loading, shorts: false},
                    }));
                } catch (error) {
                    console.error("❌ [Shorts Tab] 실패:", error);
                    setState((prev) => ({...prev, loading: {...prev.loading, shorts: false}}));
                }
            } else if (activeTab === 'channel') {
                console.log('🔍 [Channel Tab] 검색 시작:', query);

                try {
                    const result = await searchChannels(query);
                    setState((prev) => ({
                        ...prev,
                        channels: result,
                        loading: {...prev.loading, channels: false},
                    }));
                } catch (error) {
                    console.error("❌ [Channel Tab] 실패:", error);
                    setState((prev) => ({...prev, loading: {...prev.loading, channels: false}}));
                }
            }
        };

        fetchData();
    }, [query, activeTab, router]);

    return {
        channels: state.channels,
        videos: state.videos,
        shorts: state.shorts,
        loading: state.loading,
        videoNextPageToken: state.videoPagination.nextPageToken,
        videosHasMore: state.videoPagination.hasMore,
        shortsNextPageToken: state.shortsPagination.nextPageToken,
        shortsHasMore: state.shortsPagination.hasMore,
    };
}