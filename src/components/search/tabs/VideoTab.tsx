'use client';

import VideoPreview from "@components/common/video-preview/VideoPreview";
import LoadingSection from "@components/common/LoadingSection";
import ErrorState from "@components/common/ErrorState";
import {searchVideos} from "@/services/search.service";
import type {VideoSummaryItem} from "@/types/video-preview.types";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

interface Props {
    videos: VideoSummaryItem[];
    loading: boolean;
    initialNextPageToken: string | null;
    initialHasMore: boolean;
}

export default function VideoTab({videos, loading, initialNextPageToken, initialHasMore}: Props) {
    const {data, hasMore, isLoadingMore, scrollRef} = useInfiniteScroll({
        initialData: videos,
        initialNextPageToken,
        initialHasMore,
        searchFunction: searchVideos,
    });

    const hasSearchStarted = loading || data.length > 0;

    if (!hasSearchStarted) {
        return null;
    }

    if (loading && data.length === 0) {
        return <LoadingSection message="동영상 검색 결과를 불러오는 중이에요..."/>;
    }

    if (!data || data.length === 0) {
        return <ErrorState title="검색 결과가 없습니다" emoji="🫤" description=""/>;
    }

    return (
        <div className="flex flex-col w-full gap-5">
            {data.map((video, index) => (
                <VideoPreview key={`${video.video.id}-${index}`} data={video}/>
            ))}

            {hasMore && (
                <div ref={scrollRef} className="py-4 text-center">
                    {isLoadingMore && (
                        <div className="flex items-center justify-center gap-2">
                            <div
                                className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"/>
                            <span className="text-sm text-gray-600">더 많은 동영상을 불러오는 중이에요...</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}