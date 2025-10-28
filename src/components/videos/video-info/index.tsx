"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import YouTubePlayer, { YouTubePlayerRef } from "./YoutubePlayer";
import { formatDate, formatNumber } from "@/utils/data-format";
import type { VideoResult } from "@/types/video";
import { useAuth } from "@/contexts/AuthContext";
import { createScrap, deleteScrap } from "@/service/videoService";
import { addFavoriteChannel, removeFavoriteChannel } from "@/service/channelService";
import { BookmarkIcon, HeartIcon } from '@/components/icons';

interface Props {
    data: VideoResult;
    onPlayerReady?: (ref: YouTubePlayerRef) => void;
}

export default function VideoInfoSection({ data, onPlayerReady }: Props) {
    const { video, channel } = data;
    const { isLoggedIn, handleLogin } = useAuth();

    const [scrapId, setScrapId] = useState<number | null>(video.scrapId ?? null);
    const [favoriteChannelId, setFavoriteChannelId] = useState<number | null>(channel.favoriteChannelId ?? null);
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

    const requireLogin = useCallback(() => {
        if (!isLoggedIn) {
            if (confirm("로그인이 필요한 작업입니다. 로그인하시겠습니까?")) {
                handleLogin();
            }
            return true;
        }
        return false;
    }, [isLoggedIn, handleLogin]);

    const handleScrapToggle = useCallback(async () => {
        if (requireLogin()) return;

        try {
            if (scrapId) {
                await deleteScrap(scrapId);
                setScrapId(null);
            } else {
                const newScrapId = await createScrap(video.id);
                setScrapId(newScrapId);
            }
        } catch (err) {
            console.error("스크랩 요청 실패:", err);
        }
    }, [scrapId, video.id, requireLogin]);

    const handleFavoriteToggle = useCallback(async () => {
        if (requireLogin()) return;

        try {
            if (favoriteChannelId != null) {
                await removeFavoriteChannel(favoriteChannelId);
                setFavoriteChannelId(null);
            } else {
                const newFavoriteChannelId = await addFavoriteChannel(
                    channel.id,
                    channel.title,
                    channel.thumbnailUrl
                );
                setFavoriteChannelId(newFavoriteChannelId);
            }
        } catch (err) {
            console.error("관심 채널 요청 실패:", err);
        }
    }, [favoriteChannelId, channel.id, channel.title, channel.thumbnailUrl, requireLogin]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 w-full h-fit mx-auto items-start">
            <div ref={leftRef} className="md:min-w-[450px] md:max-w-[800px]">
                <YouTubePlayer videoId={video.id} onReadyRef={onPlayerReady} />
            </div>

            <div className="flex flex-col gap-3 min-w-[100px]" style={{ minHeight: videoHeight }}>
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
                    className="relative px-4 py-3 bg-gray-100 hover:bg-gray-200/80 transition-all duration-300 rounded-2xl cursor-pointer"
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