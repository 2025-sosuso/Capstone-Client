'use client';

import {useRouter} from "next/navigation";
import ShortsThumbnail from "@components/common/Thumbnail/ShortsThumbnail";
import AnalysisPanel from "@components/common/Video/AnalysisPanel";
import type {VideoSummaryItem} from "@/types/video-summary.types";
import VideoInfo from "@components/common/Video/VideoInfo";

interface Props {
    data: VideoSummaryItem;
}

export default function ShortsItem({data}: Props) {
    const router = useRouter();
    const {video, channel, analysis} = data;

    return (
        <div className="flex gap-3 cursor-pointer" onClick={() => router.push(`/videos/${video.id}`)}>
            <div className="w-[140px] flex-shrink-0">
                <ShortsThumbnail src={video.thumbnailUrl}/>
            </div>

            <div className="flex flex-col w-full flex-1 gap-2 min-w-0">
                <VideoInfo video={video} channel={channel}/>
                <AnalysisPanel analysis={analysis}/>
            </div>
        </div>
    );
}