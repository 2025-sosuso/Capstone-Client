'use client';

import {ChannelSearchResult} from "@/types";
import Image from "next/image";
import {formatNumber} from "@/utils/data-format";
import {HeartIcon} from "@components/Icons";
import {useFavoriteChannel} from "@/hooks/useFavoriteChannel";

interface Props {
    channel: ChannelSearchResult;
}

export default function ChannelPreview({channel}: Props) {
    const {favoriteChannelId, handleFavoriteToggle} = useFavoriteChannel({
        channelId: channel.id,
        channelTitle: channel.title,
        channelThumbnail: channel.thumbnailUrl,
        initialFavoriteId: channel.favoriteChannelId ?? null,
    });

    return (
        <div
            className="flex flex-col items-center w-[140px] h-[210px] gap-2 px-2 py-3 bg-gray-100 rounded-2xl flex-shrink-0">
            <div className="flex-shrink-0">
                <Image
                    src={channel.thumbnailUrl}
                    alt={channel.title}
                    width={85}
                    height={85}
                    className="object-cover rounded-full"
                />
            </div>

            <div className="flex flex-col items-center justify-start flex-1 w-full min-h-0">
                <div
                    className="flex items-center justify-center w-full px-1"
                    style={{minHeight: '36px', maxHeight: '36px'}}
                >
                    <div
                        className="text-sm font-medium text-gray-700 text-center line-clamp-2"
                        style={{lineHeight: '1.2'}}
                        title={channel.title}
                    >
                        {channel.title}
                    </div>
                </div>

                <p className="text-sm text-gray-500 mt-1 flex-shrink-0">
                    구독자 {formatNumber(channel.subscriberCount)}명
                </p>
            </div>

            <button
                className="flex-shrink-0 transition-colors cursor-pointer mt-auto"
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