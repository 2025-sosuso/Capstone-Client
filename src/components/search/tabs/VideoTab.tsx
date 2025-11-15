'use client';

import VideoPreview from "@components/common/video-preview/VideoPreview";
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

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                {loading && (
                    <p className="text-gray-400 text-sm mt-2">검색 중...</p>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-5">
            {data.map((video, index) => (
                <VideoPreview key={`${video.video.id}-${index}`} data={video} />
            ))}

            {hasMore && (
                <div ref={scrollRef} className="py-4 text-center">
                    {isLoadingMore && (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"/>
                            <span className="text-gray-600">더 많은 동영상을 불러오는 중...</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}