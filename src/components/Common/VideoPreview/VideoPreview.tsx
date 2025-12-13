'use client';

import {useRouter} from "next/navigation";
import Thumbnail from "@components/Common/Thumbnail/Thumbnail";
import type {VideoSummaryItem as VideoSummaryItemType} from "@/types/video-preview.types";
import AnalysisPanel from "@components/Common/VideoPreview/AnalysisPanel";
import VideoInfo from "@components/Common/VideoPreview/VideoInfo";
import SelectButton from "@components/Common/SelectButton";
import {useCompare} from "@/contexts/CompareContext";

type Props = {
    rank?: number;
    data: VideoSummaryItemType;
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
        <div
            className={`flex flex-col lg:flex-row gap-6 w-full ${compareMode ? 'cursor-pointer' : ''}`}
        >
            <div className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0 cursor-pointer"
                 onClick={handleClick}
            >
                {rank !== undefined && (
                    <span className="text-xl font-bold w-6">{rank}</span>
                )}

                <div className="w-full sm:w-[280px] flex-shrink-0 overflow-hidden rounded-2xl relative">
                    <Thumbnail src={video.thumbnailUrl ?? ""}/>

                    {compareMode && (
                        <div className="absolute top-3 right-3">
                            <SelectButton selected={selected}/>
                        </div>
                    )}
                </div>

                <VideoInfo video={video} channel={channel}/>
            </div>

            <AnalysisPanel analysis={analysis} className="w-full lg:w-[40%]"/>
        </div>
    );
}