'use client'

import VideoSummaryItem from './VideoSummaryItem';
import {useAuth} from "@/contexts/AuthContext";
import LoginButton from "@components/common/LoginButton";
import {VideoSummaryResponse} from "@/types/video-summary";

interface Props {
    type?: string;
    data: VideoSummaryResponse[];
}

export default function VideoSummaryList({type="trending", data}: Props) {
    const { isLoggedIn, handleLogin } = useAuth();

    if (type === "scraps" && !isLoggedIn) {
        return (
            <div className="flex flex-col w-full items-center justify-center text-center py-20 gap-5 bg-gray-100 rounded-3xl">
                <p className="text-lg"> 지금 로그인하고, 스크랩 영상을 빠르게 확인해보세요!</p>
                <LoginButton isLoggedIn={isLoggedIn} onClick={handleLogin}/>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {data.map((item, i) => {
                if (!item.data) return null;

                return (
                    <VideoSummaryItem
                        key={i}
                        rank={i + 1}
                        data={item.data}
                    />
                );
            })}
        </div>
    );
}
