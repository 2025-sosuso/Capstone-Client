'use client';

import SubscribedChannels from '@components/Home/SubscribedChannels/SubscribedChannels';
import ListSection from './ListSection';
import { MainPageData } from '@/types/main.types';
import { useState, useEffect, useCallback } from 'react';
import type { VideoSummaryItem, AnalysisSummaryOnly } from '@/types/video-preview.types';
import { useAIPolling } from '@/hooks/useAIPolling';

interface Props {
    data: MainPageData;
    isLoading: {
        favoriteChannels: boolean;
        trending: boolean;
        scraps: boolean;
    };
}

export default function Home({ data, isLoading }: Props) {
    const { favoriteChannelVideo } = data;

    // 로컬 state로 복사하여 AI 폴링 적용
    const [trendingVideos, setTrendingVideos] = useState<VideoSummaryItem[]>(data.trendingVideos);
    const [scrapVideos, setScrapVideos] = useState<VideoSummaryItem[]>(data.scrapVideos);

    // props 변경 시 로컬 state 업데이트
    useEffect(() => {
        setTrendingVideos(data.trendingVideos);
    }, [data.trendingVideos]);

    useEffect(() => {
        setScrapVideos(data.scrapVideos);
    }, [data.scrapVideos]);

    // AI 폴링 업데이트 콜백 - 인기 급상승
    const handleTrendingAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setTrendingVideos((prev) =>
            prev.map((item) =>
                item.video.id === videoId ? { ...item, analysis } : item
            )
        );
    }, []);

    // AI 폴링 업데이트 콜백 - 스크랩
    const handleScrapAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setScrapVideos((prev) =>
            prev.map((item) =>
                item.video.id === videoId ? { ...item, analysis } : item
            )
        );
    }, []);

    // AI 폴링 시작
    useAIPolling(trendingVideos, handleTrendingAIUpdate);
    useAIPolling(scrapVideos, handleScrapAIUpdate);

    return (
        <div className="w-full flex flex-col gap-10 py-5 items-center px-4">
            <div className="w-full max-w-screen-xl">
                <SubscribedChannels
                    data={favoriteChannelVideo?.latestVideo ?? null}
                    favoriteChannelList={favoriteChannelVideo?.channels ?? []}
                    isLoading={isLoading.favoriteChannels}
                />

                <div className="flex flex-col w-full gap-10 py-5">
                    <ListSection
                        type="trending"
                        data={trendingVideos}
                        isLoading={isLoading.trending}
                    />
                    <ListSection
                        type="scraps"
                        data={scrapVideos}
                        isLoading={isLoading.scraps}
                    />
                </div>
            </div>
        </div>
    );
}