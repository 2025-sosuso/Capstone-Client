import {useState, useEffect} from 'react';
import {fetchFavoriteChannelVideo, fetchTrendingVideos, fetchScrapVideos} from '@/services/main.service';
import {MainPageData} from '@/types/main.types';
import {useAuth} from '@/contexts/AuthContext';

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
            // 비로그인: 보호 섹션 로딩 종료 표시
            setIsLoading((prev) => ({...prev, favoriteChannels: false, scraps: false}));
            setData((prev) => ({...prev, favoriteChannelVideo: null, scrapVideos: []}));
        }

        return () => {
            mounted = false;
        };
    }, [isLoggedIn]);

    return {data, isLoading};
}
