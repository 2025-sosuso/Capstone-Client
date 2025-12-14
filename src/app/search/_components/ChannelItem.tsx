'use client';

import {ChannelSearchResult} from "@/types";
import Image from "next/image";
import {formatNumber} from "@/utils/data-format";
import {HeartIcon} from "@components/Icons";
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
        <div className="flex items-center w-full gap-5 h-[90px]">
            <Image
                src={channel.thumbnailUrl}
                alt={channel.title}
                width={85}
                height={85}
                className="object-cover rounded-full flex-shrink-0"
            />

            <div className="flex flex-col w-full h-full gap-1 flex-1 min-w-0">
                <p className="text-lg text-gray-700 line-clamp-1">{channel.title}</p>
                <div>
                    <p className="text-sm text-gray-500">구독자 {formatNumber(channel.subscriberCount)}명</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{channel.description}</p>
                </div>
            </div>

            <button
                className="flex-shrink-0 transition-colors cursor-pointer"
                onClick={handleFavoriteToggle}
            >
                <HeartIcon
                    className={favoriteChannelId ? "text-red-400" : "text-gray-300"}
                    size={26}
                />
            </button>
        </div>
    );
}