'use client';

import {useRouter} from "next/navigation";
import type {VideoSummaryItem} from "@/types/video-preview.types";
import AnalysisPanel from "@components/Common/VideoPreview/AnalysisPanel";
import VideoInfo from "@components/Common/VideoPreview/VideoInfo";
import SelectButton from "@components/Common/SelectButton";
import {useCompare} from "@/contexts/CompareContext";
import ShortsThumbnail from "@components/Common/Thumbnail/ShortsThumbnail";

type Props = {
    rank?: number;
    data: VideoSummaryItem;
};

export default function VideoPreview({rank, data}: Props) {
    const router = useRouter();
    const {compareMode, selectVideo, isSelected} = useCompare();
    const {video, channel, analysis} = data;

    if (!video || !channel) return null;

    const selected = isSelected(video.id);

    const handleClick = () => {
        if (compareMode) {
            selectVideo(data);
        } else {
            router.push(`/videos/${video.id}`);
        }
    };

    return (
        <div className={`flex flex-col sm:flex-row gap-4 w-full items-center sm:items-start ${compareMode ? 'cursor-pointer' : ''}`}>
            {rank !== undefined && (
                <span className="text-xl font-bold w-6 flex-shrink-0">{rank}</span>
            )}

            <div
                className="w-[160px] flex-shrink-0 overflow-hidden rounded-2xl relative cursor-pointer"
                onClick={handleClick}
            >
                <ShortsThumbnail src={video.thumbnailUrl ?? ""}/>

                {compareMode && (
                    <div className="absolute top-3 right-3">
                        <SelectButton selected={selected}/>
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <VideoInfo video={video} channel={channel}/>
                <AnalysisPanel analysis={analysis} className="w-full mt-2"/>
            </div>
        </div>
    );
}