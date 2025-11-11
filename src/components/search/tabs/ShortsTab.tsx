'use client';

import ShortsPreview from "@components/common/video-preview/ShortsPreview";
import LoadingSection from "@components/common/LoadingSection";
import {searchShorts} from "@/services/search.service";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";
import type {VideoSummaryItem} from "@/types";

interface Props {
    shorts: VideoSummaryItem[];
    loading: boolean;
    initialNextPageToken: string | null;
    initialHasMore: boolean;
}

export default function ShortsTab({shorts, loading, initialNextPageToken, initialHasMore}: Props) {
    const {data, hasMore, isLoadingMore, scrollRef} = useInfiniteScroll({
        initialData: shorts,
        initialNextPageToken,
        initialHasMore,
        searchFunction: searchShorts,
    });

    if (loading) {
        return <LoadingSection message="Shorts 검색 중..."/>;
    }

    if (!data || data.length === 0) {
        return <p className="text-gray-500">검색 결과가 없습니다.</p>;
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {data.map((video, index) => (
                    <ShortsPreview key={`${video.video.id}-${index}`} data={video} />
                ))}
            </div>

            {hasMore && (
                <div ref={scrollRef} className="py-4 text-center">
                    {isLoadingMore && (
                        <div className="flex items-center justify-center gap-2">
                            <div
                                className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"/>
                            <span className="text-gray-600">더 많은 Shorts를 불러오는 중...</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}