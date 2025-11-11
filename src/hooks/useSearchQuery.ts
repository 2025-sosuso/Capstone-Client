import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {searchChannels, searchVideos, searchShorts} from "@/services/search.service";
import type {VideoSummaryItem, ChannelSearchResult} from "@/types";

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

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            // 초기화
            setState(initialState);

            if (activeTab === 'all') {
                // 통합 탭: 모든 데이터 병렬 로딩
                setState((prev) => ({
                    ...prev,
                    loading: {channels: true, videos: true, shorts: true},
                }));

                console.log('🔍 [All Tab] 검색 시작:', query);

                const [channelResult, videoResult, shortsResult] = await Promise.allSettled([
                    searchChannels(query),
                    searchVideos(query),
                    searchShorts(query),
                ]);

                console.log('📦 [All Tab] 채널 결과:', channelResult);
                console.log('📦 [All Tab] 동영상 결과:', videoResult);
                console.log('📦 [All Tab] 쇼츠 결과:', shortsResult);

                setState((prev) => {
                    const newState = {...prev, loading: {channels: false, videos: false, shorts: false}};

                    // 채널 검색
                    if (channelResult.status === 'fulfilled') {
                        newState.channels = channelResult.value;
                        console.log('✅ [All Tab] 채널 설정:', newState.channels.length);
                    } else {
                        console.error('❌ [All Tab] 채널 검색 실패:', channelResult.reason);
                    }

                    // 동영상
                    if (videoResult.status === 'fulfilled') {
                        newState.videos = videoResult.value.results;
                        newState.videoPagination = {
                            nextPageToken: videoResult.value.nextPageToken,
                            hasMore: videoResult.value.hasMore,
                        };
                        console.log('✅ [All Tab] 동영상 설정:', newState.videos.length);
                    } else {
                        console.error('❌ [All Tab] 동영상 검색 실패:', videoResult.reason);
                    }

                    // 쇼츠
                    if (shortsResult.status === 'fulfilled') {
                        newState.shorts = shortsResult.value.results;
                        newState.shortsPagination = {
                            nextPageToken: shortsResult.value.nextPageToken,
                            hasMore: shortsResult.value.hasMore,
                        };
                        console.log('✅ [All Tab] 쇼츠 설정:', newState.shorts.length);
                    } else {
                        console.error('❌ [All Tab] 쇼츠 검색 실패:', shortsResult.reason);
                    }

                    return newState;
                });
            } else if (activeTab === 'video') {
                // 동영상 탭
                setState((prev) => ({...prev, loading: {...prev.loading, videos: true}}));

                console.log('🔍 [Video Tab] 검색 시작:', query);

                try {
                    const result = await searchVideos(query);
                    console.log('✅ [Video Tab] API 응답:', result);

                    setState((prev) => ({
                        ...prev,
                        videos: result.results,
                        videoPagination: {
                            nextPageToken: result.nextPageToken,
                            hasMore: result.hasMore,
                        },
                        loading: {...prev.loading, videos: false},
                    }));

                    console.log('✅ [Video Tab] 동영상 설정 완료:', result.results.length, '개');
                } catch (error) {
                    console.error("❌ [Video Tab] 동영상 검색 실패:", error);
                    setState((prev) => ({...prev, loading: {...prev.loading, videos: false}}));
                }
            } else if (activeTab === 'shorts') {
                // 쇼츠 탭
                setState((prev) => ({...prev, loading: {...prev.loading, shorts: true}}));

                console.log('🔍 [Shorts Tab] 검색 시작:', query);

                try {
                    const result = await searchShorts(query);
                    console.log('✅ [Shorts Tab] API 응답:', result);

                    setState((prev) => ({
                        ...prev,
                        shorts: result.results,
                        shortsPagination: {
                            nextPageToken: result.nextPageToken,
                            hasMore: result.hasMore,
                        },
                        loading: {...prev.loading, shorts: false},
                    }));

                    console.log('✅ [Shorts Tab] 쇼츠 설정 완료:', result.results.length, '개');
                } catch (error) {
                    console.error("❌ [Shorts Tab] 쇼츠 검색 실패:", error);
                    setState((prev) => ({...prev, loading: {...prev.loading, shorts: false}}));
                }
            } else if (activeTab === 'channel') {
                // 채널 탭
                setState((prev) => ({...prev, loading: {...prev.loading, channels: true}}));

                console.log('🔍 [Channel Tab] 검색 시작:', query);

                try {
                    const result = await searchChannels(query);
                    console.log('✅ [Channel Tab] API 응답:', result);

                    setState((prev) => ({
                        ...prev,
                        channels: result,  // 배열 직접 저장
                        loading: {...prev.loading, channels: false},
                    }));

                    console.log('✅ [Channel Tab] 채널 설정 완료:', result.length, '개');
                } catch (error) {
                    console.error("❌ [Channel Tab] 채널 검색 실패:", error);
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