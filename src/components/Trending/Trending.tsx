'use client';

import {useEffect, useState, useCallback} from "react";
import VideoPreviewList from "@components/Common/VideoPreview/VideoPreviewList";
import type {VideoSummaryItem, AnalysisSummaryOnly} from "@/types/video-preview.types";
import {fetchTrendingVideos} from "@/services/video.service";
import LoadingSection from "@components/Common/LoadingSection";
import {useAIPolling} from "@/hooks/useAIPolling";

export default function Trending() {
    const [videoList, setVideoList] = useState<VideoSummaryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const maxResults = 10;

    // AI 분석 업데이트 콜백
    const handleAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setVideoList((prev) =>
            prev.map((item) =>
                item.video.id === videoId ? { ...item, analysis } : item
            )
        );
    }, []);

    // AI 폴링 시작
    useAIPolling(videoList, handleAIUpdate);

    useEffect(() => {
        const fetch = async () => {
            console.log("[인기급상승] API 요청 시작", maxResults);
            setIsLoading(true);
            setIsError(false);

            try {
                const result = await fetchTrendingVideos(maxResults);
                console.log("[인기급상승] API 응답 성공", result);
                setVideoList(result);
            } catch (err) {
                console.error("[인기급상승] API 요청 실패", err);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, []);

    if (isLoading) return <LoadingSection message="데이터를 불러오고 있습니다..."/>;
    if (isError) return <div className="text-center text-gray-500 py-10">인기 영상 정보를 불러오지 못했어요.</div>;

    return (
        <div className="w-full flex justify-center px-4 py-5">
            <div className="w-full max-w-screen-xl flex flex-col gap-10">
                <div className="flex items-center gap-2">
                    <span className="text-3xl">🔥</span>
                    <h1 className="text-2xl font-semibold text-gray-900">지금 핫한</h1>
                </div>

                <VideoPreviewList data={videoList}/>
            </div>
        </div>
    );
}