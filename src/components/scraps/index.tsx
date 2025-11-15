'use client';

import {useAuth} from "@/contexts/AuthContext";
import VideoPreviewList from "@components/common/video-preview/VideoPreviewList";
import {useEffect, useState, useCallback} from "react";
import {fetchScrapsVideos} from "@/services/video.service";
import LoadingSection from "@components/common/LoadingSection";
import type {VideoSummaryItem, AnalysisSummaryOnly} from "@/types/video-preview.types";
import LoginCallout from "@components/common/LoginCallout";
import {useAIPolling} from "@/hooks/useAIPolling";

export default function Scraps() {
    const {isLoggedIn} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [videoList, setVideoList] = useState<VideoSummaryItem[]>([]);

    const handleAIUpdate = useCallback((videoId: string, analysis: AnalysisSummaryOnly) => {
        setVideoList((prev) =>
            prev.map((item) =>
                item.video.id === videoId ? {...item, analysis} : item
            )
        );
    }, []);

    useAIPolling(videoList, handleAIUpdate);

    useEffect(() => {
        if (!isLoggedIn) return;
        const fetch = async () => {
            console.log("[스크랩] API 요청 시작");
            setIsLoading(true);
            setIsError(false);

            try {
                const result = await fetchScrapsVideos();
                console.log("[스크랩] API 응답 성공", result);
                setVideoList(result);
            } catch (err) {
                console.error("[스크랩] API 요청 실패", err);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, [isLoggedIn]);

    if (isLoading) return <LoadingSection message="데이터를 불러오고 있습니다..."/>;
    if (isError) return <div className="text-center text-gray-500 py-10">스크랩 정보를 불러오지 못했어요.</div>;

    return (
        <div className="w-full flex justify-center px-4 py-5">
            <div className="w-full max-w-screen-xl flex flex-col gap-10">
                <div className="flex items-center gap-2">
                    <span className="text-3xl">🔖</span>
                    <h1 className="text-2xl font-semibold text-gray-900">스크랩</h1>
                </div>

                {isLoggedIn ? (
                    <VideoPreviewList data={videoList}/>
                ) : (
                    <LoginCallout text="지금 로그인하고, 스크랩 영상을 빠르게 확인해보세요!"/>
                )}
            </div>
        </div>
    );
}