'use client';

import {ChannelSearchResult} from "@/types/channel.types";
import Image from "next/image";
import {formatNumber} from "@/utils/data-format";
import {HeartIcon} from "@components/icons";
import {useFavoriteChannel} from "@/hooks/useFavoriteChannel";

interface Props {
    channel: ChannelSearchResult;
}

export default function ChannelItem({channel}: Props) {
    const {favoriteChannelId, handleFavoriteToggle} = useFavoriteChannel({
        channelId: channel.id,
        channelTitle: channel.title,
        channelThumbnail: channel.thumbnailUrl,
        initialFavoriteId: channel.favoriteChannelId ?? null,
    });

    return (
        <div
            className="flex flex-col items-center justify-between w-[140px] h-[200px] gap-2 p-4 bg-gray-100 rounded-2xl flex-shrink-0">
            {/* 프로필 이미지 */}
            <div className="flex-shrink-0">
    <Image
        src={channel.thumbnailUrl}
    alt={channel.title}
    width={85}
    height={85}
    className="object-cover rounded-full"
        />
        </div>

    {/* 채널 정보 */}
    <div className="flex flex-col items-center justify-center flex-1 w-full">
    <p
        className="text-sm font-medium text-gray-700 line-clamp-2 text-center w-full px-1 leading-tight"
    title={channel.title}  // hover 시 전체 이름 표시
        >
        {channel.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">
        구독자 {formatNumber(channel.subscriberCount)}명
    </p>
    </div>

    {/* 관심 채널 버튼 */}
    <button
        className="flex-shrink-0 transition-colors cursor-pointer"
    onClick={handleFavoriteToggle}
    aria-label={favoriteChannelId ? "관심 채널 취소" : "관심 채널 추가"}
    >
    <HeartIcon
        className={favoriteChannelId ? "text-red-400" : "text-gray-300"}
    size={24}
    />
    </button>
    </div>
);
}