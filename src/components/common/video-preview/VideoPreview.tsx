'use client';

import {useRouter} from "next/navigation";
import Thumbnail from "@components/common/Thumbnail/Thumbnail";
import type {VideoSummaryItem as VideoSummaryItemType} from "@/types/video-preview.types";
import AnalysisPanel from "@components/common/video-preview/AnalysisPanel";
import VideoInfo from "@components/common/video-preview/VideoInfo";

type Props = {
    rank?: number;
    data: VideoSummaryItemType;
};

export default function VideoPreview({rank, data}: Props) {
    const router = useRouter();
    const {video, channel, analysis} = data;

    if (!video || !channel) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div
                className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0 cursor-pointer"
                onClick={() => router.push(`/videos/${video.id}`)}
            >
                {rank !== undefined && (
                    <span className="text-xl font-bold w-6">{rank}</span>
                )}

                <div className="w-full sm:w-[280px] flex-shrink-0 overflow-hidden rounded-2xl">
                    <Thumbnail src={video.thumbnailUrl ?? ""}/>
                </div>

                <VideoInfo video={video} channel={channel}/>
            </div>

            <AnalysisPanel analysis={analysis} className="w-full lg:w-[40%]" />
        </div>
    );
}