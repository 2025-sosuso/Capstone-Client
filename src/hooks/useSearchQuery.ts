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
                item.video.id === videoId ? {...item, analysis} : item
            ),
        }));
    }, []);

    const handleShortsAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setState((prev) => ({
            ...prev,
            shorts: prev.shorts.map((item) =>
                item.video.id === videoId ? {...item, analysis} : item
            ),
        }));
    }, []);

    useAIPolling(state.videos, handleVideoAIUpdate);
    useAIPolling(state.shorts, handleShortsAIUpdate);

    useEffect(() => {
        if (!query) return;

        // 상태 초기화
        setState({
            channels: null,
            videos: [],
            shorts: [],
            loading: {channels: true, videos: true, shorts: true},
            videoPagination: {nextPageToken: null, hasMore: false},
            shortsPagination: {nextPageToken: null, hasMore: false},
        });

        // 개별 fetch 함수들
        const fetchChannels = () => {
            searchChannels(query)
                .then((result) => {
                    setState((prev) => ({
                        ...prev,
                        channels: result,
                        loading: {...prev.loading, channels: false},
                    }));
                })
                .catch((error) => {
                    console.error("❌ [Channel] 실패:", error);
                    setState((prev) => ({...prev, loading: {...prev.loading, channels: false}}));
                });
        };

        const fetchVideos = () => {
            searchVideos(query)
                .then((result) => {
                    setState((prev) => ({
                        ...prev,
                        videos: result.results,
                        videoPagination: {
                            nextPageToken: result.nextPageToken,
                            hasMore: result.hasMore,
                        },
                        loading: {...prev.loading, videos: false},
                    }));
                })
                .catch((error) => {
                    console.error("❌ [Video] 실패:", error);
                    setState((prev) => ({...prev, loading: {...prev.loading, videos: false}}));
                });
        };

        const fetchShorts = () => {
            searchShorts(query)
                .then((result) => {
                    setState((prev) => ({
                        ...prev,
                        shorts: result.results,
                        shortsPagination: {
                            nextPageToken: result.nextPageToken,
                            hasMore: result.hasMore,
                        },
                        loading: {...prev.loading, shorts: false},
                    }));
                })
                .catch((error) => {
                    console.error("❌ [Shorts] 실패:", error);
                    setState((prev) => ({...prev, loading: {...prev.loading, shorts: false}}));
                });
        };

        // 탭별 fetch 실행
        if (activeTab === 'all') {
            fetchChannels();
            fetchVideos();
            fetchShorts();
        } else if (activeTab === 'video') {
            fetchVideos();
        } else if (activeTab === 'shorts') {
            fetchShorts();
        } else if (activeTab === 'channel') {
            fetchChannels();
        }

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