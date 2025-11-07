'use client';

import {ChannelSearchResult} from "@/types/channel.types";
import Image from "next/image";
import {useEffect, useState} from "react";
import {addFavoriteChannel, removeFavoriteChannel} from "@/services/channel.service";
import {useAuth} from "@/contexts/AuthContext";
import {formatNumber} from "@/utils/data-format";
import {HeartIcon} from "@components/icons";

interface Props {
    channel: ChannelSearchResult;
}

export default function SearchChannelResultItem({channel}: Props) {
    const [favoriteChannelId, setFavoriteChannelId] = useState<number | null>(channel.favoriteChannelId ?? null);
    const {isLoggedIn, handleLogin} = useAuth();


    useEffect(() => {
        setFavoriteChannelId(channel.favoriteChannelId ?? null);
    }, [channel.favoriteChannelId]);

    const requireLogin = () => {
        if (!isLoggedIn) {
            if (confirm("로그인이 필요한 작업입니다. 로그인하시겠습니까?")) handleLogin();
            return true;
        }
        return false;
    };

    const handleFavoriteToggle = async () => {
        if (requireLogin()) return;

        try {
            if (favoriteChannelId) {
                console.log(`[관심 해제] 채널 ID: ${channel.id}, 이름: ${channel.title}, 현재 favoriteChannelId: ${favoriteChannelId}`);
                await removeFavoriteChannel(favoriteChannelId);
                setFavoriteChannelId(null);
            } else {
                console.log(`[관심 등록] 채널 ID: ${channel.id}, 이름: ${channel.title}`);
                const newFavoriteChannelId = await addFavoriteChannel(channel.id, channel.title, channel.thumbnailUrl);
                setFavoriteChannelId(newFavoriteChannelId);
                console.log(`관심 채널 등록 완료, 새 ID: ${newFavoriteChannelId}`);
            }
        } catch (err) {
            console.error("관심 채널 처리 실패:", err);
        }
    };

    return (
        <div className="flex flex-col items-center gap-5 h-[90px]">
            <Image
                src={channel.thumbnailUrl}
                alt={channel.title}
                width={85}
                height={85}
                className="object-contain rounded-full"
            />

            <div className="flex flex-col w-full h-full gap-1">
                <p className="text-lg text-gray-700 line-clamp-1">{channel.title}</p>
                <div>
                    <p className="text-sm text-gray-500">구독자 {formatNumber(channel.subscriberCount)}명</p>
                </div>
            </div>

            <button
                className="shrink-0 transition-colors cursor-pointer"
                onClick={handleFavoriteToggle}
                aria-label={favoriteChannelId ? "관심 채널 취소" : "관심 채널 추가"}
            >
                <HeartIcon
                    className={favoriteChannelId ? "text-red-400" : "text-gray-300"}
                    size={26}
                />
            </button>
        </div>
    );
}
