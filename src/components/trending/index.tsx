'use client';

import { useEffect, useState } from "react";
import CategoryBar from "@components/trending/CategoryBar";
import VideoSummaryList from "@components/common/VideoSummary/VideoSummaryList";
import type { VideoSummaryItem } from "@/types/video-summary";
import { fetchTrendingVideos } from "@/service/videoService";
import LoadingSection from "@components/common/LoadingSection";

type CategoryType = "latest" | "music" | "game";

const categories: { label: string; value: CategoryType }[] = [
    { label: "최신", value: "latest" },
    { label: "음악", value: "music" },
    { label: "게임", value: "game" },
];

export default function Trending() {
    const [isSelected, setIsSelected] = useState<CategoryType>("latest");
    const [videoList, setVideoList] = useState<VideoSummaryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const maxResults = 7;

    useEffect(() => {
        const fetch = async () => {
            console.log("[인기급상승] API 요청 시작", isSelected, maxResults);
            setIsLoading(true);
            setIsError(false);

            try {
                const result = await fetchTrendingVideos(isSelected, maxResults);
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
    }, [isSelected]);

    if (isLoading) return <LoadingSection message="데이터를 불러오고 있습니다..." />;
    if (isError) return <div className="text-center text-gray-500 py-10">인기 영상 정보를 불러오지 못했어요.</div>;

    return (
        <div className="w-full flex justify-center px-4 py-5">
            <div className="w-full max-w-screen-xl flex flex-col gap-10">
                <div className="flex items-center gap-2">
                    <span className="text-3xl">🔥</span>
                    <h1 className="text-2xl font-semibold text-gray-900">인기 급상승</h1>
                </div>

                <div className="flex border-b border-gray-200">
                    {categories.map(({ label, value }) => (
                        <CategoryBar
                            key={value}
                            category={label}
                            selected={value === isSelected}
                            onClick={() => setIsSelected(value)}
                        />
                    ))}
                </div>

                <VideoSummaryList data={videoList} />
            </div>
        </div>
    );
}
