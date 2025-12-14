"use client";

import {useEffect, useRef, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import YouTubePlayer, {YouTubePlayerRef} from "./YoutubePlayer";
import {formatDate, formatNumber} from "@/utils/data-format";
import type {VideoBasicInfo, VideoUserState} from "@/types";
import {useFavoriteChannel} from "@/hooks/useFavoriteChannel";
import {useScrap} from "@/hooks/useScrap";
import {BookmarkIcon, HeartIcon} from '@components/Icons';

interface Props {
    data: VideoBasicInfo;
    userState: VideoUserState | null;
    onPlayerReady?: (ref: YouTubePlayerRef) => void;
}

export default function VideoInfoSection({data, userState, onPlayerReady}: Props) {
    const {video, channel} = data;

    const [isExpanded, setIsExpanded] = useState(false);
    const [videoHeight, setVideoHeight] = useState(0);
    const leftRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const [descriptionHeight, setDescriptionHeight] = useState(0);

    const {scrapId, handleScrapToggle} = useScrap({
        videoId: video.id,
        initialScrapId: userState?.scrapId ?? null,
    });

    const {favoriteChannelId, handleFavoriteToggle} = useFavoriteChannel({
        channelId: channel.id,
        channelTitle: channel.title,
        channelThumbnail: channel.thumbnailUrl,
        initialFavoriteId: userState?.favoriteChannelId ?? null,
    });

    useEffect(() => {
        if (!leftRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            setVideoHeight(entry.contentRect.height);
        });
        observer.observe(leftRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (descriptionRef.current) {
            setDescriptionHeight(descriptionRef.current.scrollHeight);
        }
    }, [video.description]);

    const hasDescription = video.description?.trim();

    return (
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 w-full h-fit mx-auto items-start">
            <div ref={leftRef} className="md:min-w-[450px] md:max-w-[800px]">
                <YouTubePlayer videoId={video.id} onReadyRef={onPlayerReady}/>
            </div>

            <div className="flex flex-col gap-3 min-w-[100px]" style={{minHeight: videoHeight}}>
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
                    <button
                        className="shrink-0 transition-colors cursor-pointer"
                        onClick={handleScrapToggle}
                        aria-label={scrapId ? "스크랩 취소" : "스크랩"}
                    >
                        <BookmarkIcon
                            className={scrapId ? "text-blue-500" : "text-gray-300"}
                            size={24}
                        />
                    </button>
                </div>

                <div className="flex flex-row gap-3 items-center flex-wrap">
                    <p className="text-md text-gray-700">
                        {channel.title} | 구독자 {formatNumber(channel.subscriberCount)}명
                    </p>
                    <button
                        className="shrink-0 transition-colors cursor-pointer"
                        onClick={handleFavoriteToggle}
                        aria-label={favoriteChannelId ? "관심 채널 취소" : "관심 채널 추가"}
                    >
                        <HeartIcon
                            className={favoriteChannelId ? "text-red-400" : "text-gray-300"}
                            size={20}
                        />
                    </button>
                </div>

                <div className="text-sm text-gray-500 font-light">
                    <p>조회수 {formatNumber(video.viewCount)}회 | {formatDate(video.publishedAt)}</p>
                    <p>좋아요 {formatNumber(video.likeCount)}개 | 댓글 {formatNumber(video.commentCount)}개</p>
                </div>

                <div
                    className={`flex-1 px-4 py-3 bg-gray-100 rounded-2xl ${
                        hasDescription ? "hover:bg-gray-200/80 cursor-pointer" : ""
                    } transition-all duration-300`}
                    onClick={() => hasDescription && setIsExpanded((prev) => !prev)}
                >
                    {hasDescription ? (
                        <div className="flex gap-2">
                            <div
                                className="flex-1 overflow-hidden transition-all duration-300 ease-in-out"
                                style={{
                                    maxHeight: isExpanded ? `${descriptionHeight}px` : "3.75rem",
                                }}
                            >
                                <p
                                    ref={descriptionRef}
                                    className="text-sm text-gray-600 whitespace-pre-line font-light"
                                >
                                    {video.description}
                                </p>
                            </div>
                            <ChevronDownIcon
                                className={`size-5 shrink-0 text-gray-500 transition-transform duration-300 ${
                                    isExpanded ? "rotate-180" : "rotate-0"
                                }`}
                            />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400 font-light">영상 설명이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}