'use client';

import {useRouter} from "next/navigation";
import ShortsThumbnail from "@components/common/Thumbnail/ShortsThumbnail";
import AnalysisPanel from "@components/common/video-preview/AnalysisPanel";
import type {VideoSummaryItem} from "@/types/video-preview.types";
import VideoInfo from "@components/common/video-preview/VideoInfo";

interface Props {
    data: VideoSummaryItem;
}

export default function ShortsPreview({data}: Props) {
    const router = useRouter();
    const {video, channel, analysis} = data;

    return (
        <div className="flex gap-4 cursor-pointer" onClick={() => router.push(`/videos/${video.id}`)}>
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