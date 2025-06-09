'use client';

import { useEffect, useState } from 'react';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import ChannelAvatar from './ChannelAvatar';
import { ChannelSearchResult } from '@/types/channel';
import { fetchFavoriteChannels, removeFavoriteChannel } from '@/service/channelService';

export default function ChannelAvatarList() {
    const [edit, setEdit] = useState(false);
    const [channels, setChannels] = useState<ChannelSearchResult[]>([]);

    const toggleEdit = () => setEdit(prev => !prev);

    const loadChannels = async () => {
        try {
            const result = await fetchFavoriteChannels();
            const mapped = result.map((item): ChannelSearchResult => ({
                id: String(item.favoriteChannelId),
                title: item.apiChannelName,
                handle: '',
                description: '',
                thumbnailUrl: item.apiChannelThumbnail,
                subscriberCount: 0,
                favoriteChannelId: item.favoriteChannelId,
            }));
            setChannels(mapped);

            console.log(result);
        } catch (e) {
            console.error("관심 채널 불러오기 실패:", e);
        }
    };

    const handleRemove = async (favoriteChannelId?: number | null) => {
        if (confirm("관심 채널에서 삭제할까요?")) {
            if (!favoriteChannelId) return;
            try {
                await removeFavoriteChannel(favoriteChannelId);
                setChannels(prev => prev.filter(c => c.favoriteChannelId !== favoriteChannelId));
                console.log(`[관심 해제] favoriteChannelId: ${favoriteChannelId}`);
            } catch (e) {
                console.error("삭제 실패:", e);
            }
        }
    };

    useEffect(() => {
        loadChannels();
    }, []);

    return (
        <div className="flex items-start justify-between gap-4 px-1">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {channels.map((channel) => (
                    <ChannelAvatar
                        key={channel.favoriteChannelId ?? channel.id}
                        thumbnailUrl={channel.thumbnailUrl}
                        title={channel.title}
                        edit={edit}
                        onClick={() => {
                            if (edit) handleRemove(channel.favoriteChannelId);
                        }}
                    />
                ))}
            </div>
            <button className="cursor-pointer" onClick={toggleEdit}>
                <AdjustmentsVerticalIcon className="size-6 text-gray-500" />
            </button>
        </div>
    );
}
