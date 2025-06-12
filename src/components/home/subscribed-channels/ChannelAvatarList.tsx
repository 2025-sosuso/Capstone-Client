'use client';

import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import ChannelAvatar from './ChannelAvatar';
import { ChannelSearchResult } from '@/types/channel';
import { useState } from 'react';
import { removeFavoriteChannel } from '@/service/channelService';

interface Props {
    channels: ChannelSearchResult[];
    onSelectChannel?: (apiChannelId: string) => void;
    onUpdateChannels?: () => void;
}

export default function ChannelAvatarList({ channels, onSelectChannel, onUpdateChannels }: Props) {
    const [edit, setEdit] = useState(false);

    const toggleEdit = () => setEdit((prev) => !prev);

    const handleRemove = async (favoriteChannelId?: number | null) => {
        if (!favoriteChannelId) return;
        if (!confirm('관심 채널에서 삭제할까요?')) return;

        try {
            await removeFavoriteChannel(favoriteChannelId);
            await onUpdateChannels?.(); // 부모에게 갱신 요청
        } catch (e) {
            console.error('삭제 실패:', e);
        }
    };

    if (channels.length === 0) {
        return <p className="text-gray-400 text-sm px-1">관심 채널이 없습니다.</p>;
    }

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
                            if (edit) {
                                handleRemove(channel.favoriteChannelId);
                            } else {
                                onSelectChannel?.(channel.id);
                            }
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
