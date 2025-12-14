'use client'

import {useMemo} from "react";
import {useSearchParams} from "next/navigation";
import {useCompareVideos} from "@/hooks/useCompareVideos";
import CompareItem from "@/app/compare/_components/CompareItem";
import LoadingSection from "@components/ui/LoadingSection";

export default function Compare() {
    const searchParams = useSearchParams();
    const idsParam = searchParams.get("ids") || "";

    const ids = useMemo(() => idsParam.split(",").filter(Boolean), [idsParam]);

    const {data, isLoading} = useCompareVideos(ids);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSection message="영상 데이터를 비교 중입니다."/>
            </div>
        );
    }

    if (ids.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">비교할 영상이 없습니다.</p>
                    <p className="text-gray-500">검색 페이지에서 영상을 선택해주세요.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-4 py-8 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">📊 영상 비교하기</h1>
            <div className="flex gap-6 overflow-x-auto">
                {data.map((video, idx) => (
                    <CompareItem data={video} key={ids[idx]}/>
                ))}
            </div>
        </div>
    );
}