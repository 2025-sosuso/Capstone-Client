"use client";

import YouTubePlayer from "./YoutubePlayer";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "@/utils/date";
import type { VideoResult } from "@/types/video";

interface Props {
    data: VideoResult;
}

export default function VideoInfoSection({ data }: Props) {
    const { video, channel } = data;

    const [isLike, setIsLike] = useState(false);
    const [isScrapped, setIsScrapped] = useState(video.isScrapped);
    const [isExpanded, setIsExpanded] = useState(false);
    const [videoHeight, setVideoHeight] = useState(0);

    const leftRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!leftRef.current) return;
        const observer = new ResizeObserver(([entry]) => {
            setVideoHeight(entry.contentRect.height);
        });
        observer.observe(leftRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 w-full h-fit mx-auto items-start">
            <div ref={leftRef} className="md:min-w-[450px] md:max-w-[800px]">
                <YouTubePlayer videoId={video.id} />
            </div>

            <div className="flex flex-col gap-3 min-w-[100px]" style={{ minHeight: videoHeight }}>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                    <button
                        className={`size-6 shrink-0 transition-colors cursor-pointer ${
                            isScrapped ? "text-gray-800" : "text-gray-300"
                        }`}
                        onClick={() => setIsScrapped(!isScrapped)}
                        aria-label="스크랩"
                    >
                        <svg fill="currentColor" viewBox="0 0 40 40">
                            <path d="M5.945,7.311c0-1.552,1.258-2.811,2.811-2.811h22.488c1.552,0,2.811,1.258,2.811,2.811v26.312c0,1.443-1.562,2.344-2.811,1.623l-9.838-5.68c-.87-.502-1.941-.502-2.811,0l-9.838,5.68c-1.249.721-2.811-.18-2.811-1.623V7.311Z" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-row gap-3 items-center">
                    <p className="text-md text-gray-700">
                        {channel.title} | 구독자 {channel.subscriberCount.toLocaleString()}명
                    </p>
                    <button
                        className={`size-5 transition-colors cursor-pointer ${
                            isLike ? "text-gray-700" : "text-gray-300"
                        }`}
                        onClick={() => setIsLike(!isLike)}
                        aria-label="좋아요"
                    >
                        <svg fill="currentColor" viewBox="0 0 40 40">
                            <path d="m18.118,35.443c1.144.756,2.621.756,3.765,0,3.631-2.399,11.545-8.132,14.952-14.547,4.494-8.463-.784-16.905-7.757-16.905-3.976,0-6.369,2.077-7.691,3.863-.697.941-2.075.941-2.772,0-1.322-1.786-3.715-3.863-7.691-3.863C3.95,3.991-1.328,12.432,3.166,20.896c3.406,6.415,11.321,12.148,14.952,14.547Z" />
                        </svg>
                    </button>
                </div>

                <div className="text-sm text-gray-500 font-light">
                    <p>조회수 {video.viewCount.toLocaleString()}회 | {formatDate(video.publishedAt)}</p>
                    <p>좋아요 {video.likeCount.toLocaleString()}개 | 댓글 {video.commentCount.toLocaleString()}개</p>
                </div>

                <div
                    className="relative px-4 py-3 bg-gray-100 rounded-2xl cursor-pointer"
                    onClick={() => setIsExpanded((prev) => !prev)}
                >
                    <ChevronDownIcon
                        className={`size-6 absolute right-3 top-3 text-gray-500 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : "rotate-0"
                        }`}
                    />
                    <p
                        className={`text-sm text-gray-600 whitespace-pre-line font-light transition-all duration-300 ${
                            isExpanded ? "" : "line-clamp-5"
                        }`}
                    >
                        {video.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
