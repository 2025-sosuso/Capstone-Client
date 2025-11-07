'use client';

import {useRouter} from "next/navigation";
import Thumbnail from "@components/common/Thumbnail/Thumbnail";
import type {VideoSummaryItem as VideoSummaryItemType} from "@/types/video-summary.types";
import AnalysisPanel from "@components/common/Video/AnalysisPanel";
import VideoInfo from "@components/common/Video/VideoInfo";

type Props = {
    rank?: number;
    data: VideoSummaryItemType;
};

export default function VideoItem({rank, data}: Props) {
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

            <AnalysisPanel analysis={analysis}/>
        </div>
    );
}