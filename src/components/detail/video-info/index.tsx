"use client";

import YouTubePlayer from "./YoutubePlayer";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import type { VideoData } from "@/types/video";

type Props = {
    item: VideoData["videoInfo"]["items"][0];
};

export default function VideoInfoSection({ item }: Props) {
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 w-full max-w-screen-xl mx-auto">
            <div className="md:min-w-[500px] md:max-w-[800px]">
                <YouTubePlayer videoId={item.id} />
            </div>

            <div className="flex flex-col min-w-[100px] gap-3">
                <div className="flex justify-between gap-2">
                    <h3 className="text-lg font-semibold truncate">{item.snippet.title}</h3>
                    <svg
                        className={`size-6 shrink-0 ${isScrap ? "text-gray-800" : "text-gray-300"} cursor-pointer transition-colors`}
                        onClick={() => setIsScrap(!isScrap)}
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                        <path
                            d="M5.945,7.311c0-1.552,1.258-2.811,2.811-2.811h22.488c1.552,0,2.811,1.258,2.811,2.811v26.312c0,1.443-1.562,2.344-2.811,1.623l-9.838-5.68c-.87-.502-1.941-.502-2.811,0l-9.838,5.68c-1.249.721-2.811-.18-2.811-1.623V7.311Z"/>
                    </svg>
                </div>

                <div className="flex flex-row gap-3 md:items-center">
                    <p className="text-md text-gray-700">{item.snippet.channelTitle} | 구독자 84만 명</p>
                    <HeartIcon
                        className={`size-6 ${isLike ? "text-gray-800" : "text-gray-300"} cursor-pointer transition-colors`}
                        onClick={() => setIsLike(!isLike)}
                    />
                </div>

                <div>
                    <p className="text-sm text-gray-500 font-light">
                        조회수 {Number(item.statistics.viewCount).toLocaleString()}회 | ?? 시간 전
                    </p>
                    <p className="text-sm text-gray-500 font-light">
                        좋아요 {Number(item.statistics.likeCount).toLocaleString()}개 | 댓글 {item.statistics.commentCount}개
                    </p>
                </div>
            </div>
        </div>
    );
}
