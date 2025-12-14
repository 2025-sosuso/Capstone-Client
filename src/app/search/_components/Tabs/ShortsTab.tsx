'use client';

import ShortsPreview from "@components/Video/VideoPreview/ShortsPreview";
import LoadingSection from "@components/ui/LoadingSection";
import ErrorState from "@components/ui/ErrorState";
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

    const hasSearchStarted = loading || data.length > 0;

    if (!hasSearchStarted) {
        return null;
    }

    if (loading && data.length === 0) {
        return <LoadingSection message="Shorts 검색 결과를 불러오는 중이에요..."/>;
    }

    if (!data || data.length === 0) {
        return <ErrorState title="검색 결과가 없습니다" emoji="🫤" description=""/>;
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {data.map((video, index) => (
                    <ShortsPreview key={`${video.video.id}-${index}`} data={video}/>
                ))}
            </div>

            {hasMore && (
                <div ref={scrollRef} className="py-4 text-center">
                    {isLoadingMore && (
                        <div className="flex items-center justify-center gap-2">
                            <div
                                className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"/>
                            <span className="text-sm text-gray-600">더 많은 Shorts를 불러오는 중이에요...</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}