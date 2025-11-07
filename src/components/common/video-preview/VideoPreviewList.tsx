'use client';

import VideoItem from './VideoItem';
import {useAuth} from "@/contexts/AuthContext";
import {VideoSummaryItem as VideoSummaryItemType} from "@/types/video-summary.types";
import LoginCallout from "@components/common/LoginCallout";

interface Props {
    type?: string;
    data: VideoSummaryItemType[];
}

export default function VideoList({type = "trending", data}: Props) {
    const {isLoggedIn} = useAuth();

    if (type === "scraps" && !isLoggedIn) {
        return (
            <div
                className="flex flex-col w-full items-center justify-center text-center px-4 gap-5 bg-gray-100 rounded-3xl">
                <LoginCallout text="지금 로그인하고, 스크랩 영상을 빠르게 확인해보세요!"/>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                표시할 영상이 없습니다.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {data.map((item, i) => (
                <VideoItem key={item.video?.id ?? i} rank={i + 1} data={item}/>
            ))}
        </div>
    );
}
