import {useState, useEffect, useCallback} from 'react';
import {fetchFavoriteChannelVideo, fetchTrendingVideos, fetchScrapVideos} from '@/services/main.service';
import {MainPageData} from '@/types/main.types';
import {useAuth} from '@/contexts/AuthContext';
import {useAIPolling} from '@/hooks/useAIPolling';
import {AnalysisSummaryOnly} from '@/types/video-preview.types';

export function useMainPageData() {
    const {isLoggedIn} = useAuth();

    const [data, setData] = useState<MainPageData>({
        favoriteChannelVideo: null,
        trendingVideos: [],
        scrapVideos: [],
    });

    const [isLoading, setIsLoading] = useState({
        favoriteChannels: true,
        trending: true,
        scraps: true,
    });

    const handleTrendingAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setData((prev) => ({
            ...prev,
            trendingVideos: prev.trendingVideos.map((item) =>
                item.video.id === videoId ? { ...item, analysis } : item
            ),
        }));
    }, []);

    const handleScrapAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setData((prev) => ({
            ...prev,
            scrapVideos: prev.scrapVideos.map((item) =>
                item.video.id === videoId ? { ...item, analysis } : item
            ),
        }));
    }, []);

    const handleRecentVideoAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setData((prev) => {
            if (!prev.favoriteChannelVideo?.latestVideo) return prev;
            if (prev.favoriteChannelVideo.latestVideo.video.id !== videoId) return prev;

            return {
                ...prev,
                favoriteChannelVideo: {
                    ...prev.favoriteChannelVideo,
                    latestVideo: {
                        ...prev.favoriteChannelVideo.latestVideo,
                        analysis,
                    },
                },
            };
        });
    }, []);

    // AI 폴링 시작
    useAIPolling(data.trendingVideos, handleTrendingAIUpdate);
    useAIPolling(data.scrapVideos, handleScrapAIUpdate);

    // ✅ RecentVideo 폴링 추가!
    useAIPolling(
        data.favoriteChannelVideo?.latestVideo ? [data.favoriteChannelVideo.latestVideo] : [],
        handleRecentVideoAIUpdate
    );

    useEffect(() => {
        let mounted = true;

        // 공개 데이터: 항상 호출
        fetchTrendingVideos()
            .then((result) => {
                if (!mounted) return;
                setData((prev) => ({...prev, trendingVideos: result}));
            })
            .finally(() => {
                if (!mounted) return;
                setIsLoading((prev) => ({...prev, trending: false}));
            });

        // 보호 데이터: 로그인일 때만 호출
        if (isLoggedIn) {
            fetchFavoriteChannelVideo()
                .then((result) => {
                    if (!mounted) return;
                    setData((prev) => ({...prev, favoriteChannelVideo: result}));
                })
                .finally(() => {
                    if (!mounted) return;
                    setIsLoading((prev) => ({...prev, favoriteChannels: false}));
                });

            fetchScrapVideos()
                .then((result) => {
                    if (!mounted) return;
                    setData((prev) => ({...prev, scrapVideos: result}));
                })
                .finally(() => {
                    if (!mounted) return;
                    setIsLoading((prev) => ({...prev, scraps: false}));
                });
        } else {
            setIsLoading((prev) => ({...prev, favoriteChannels: false, scraps: false}));
            setData((prev) => ({...prev, favoriteChannelVideo: null, scrapVideos: []}));
        }

        return () => {
            mounted = false;
        };
    }, [isLoggedIn]);

    return {data, isLoading};
}