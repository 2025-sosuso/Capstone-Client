'use client'

import {useEffect, useState} from "react";
import type {VideoResult} from "@/types";
import {fetchVideoDetail} from "@/services/video.service";
import CompareItem from "@components/compare/CompareItem";

const VIDEO_IDS = ["SjkeRCZjNIw", "BNcIIzxp9vI", "3FK_9wdUnVo"];

export default function Compare() {
    const [compareData, setCompareData] = useState<(VideoResult | null)[]>([null, null, null]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAllVideos = async () => {
            try {
                const results = await Promise.all(
                    VIDEO_IDS.map(id => fetchVideoDetail(id).catch((err) => {
                        console.error(`${id} 로딩 실패:`, err);
                        return null;
                    }))
                );
                setCompareData(results);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllVideos();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">영상 데이터를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-4 py-8 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">📊 영상 비교하기</h1>
            <div className="flex gap-6 overflow-x-auto">
                {compareData.map((data, idx) => (
                    <CompareItem data={data} key={VIDEO_IDS[idx]} />
                ))}
            </div>
        </div>
    );
}