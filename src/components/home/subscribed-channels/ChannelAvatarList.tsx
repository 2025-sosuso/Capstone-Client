'use client';

import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ChannelAvatar from './ChannelAvatar';
import { mockChannelSearchResponse } from '@/mock/channel-mock';

export default function ChannelAvatarList() {
    const [edit, setEdit] = useState(false);

    const toggleEdit = () => setEdit(prev => !prev);

    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4 overflow-x-auto">
                {mockChannelSearchResponse.data.results.map((channel) => (
                    <ChannelAvatar
                        key={channel.id}
                        thumbnailUrl={channel.thumbnailUrl}
                        title={channel.title}
                        edit={edit}
                        onClick={() => console.log(channel.title)}
                    />
                ))}
            </div>
            <button className="cursor-pointer" onClick={toggleEdit}>
                <AdjustmentsVerticalIcon className="size-6 text-gray-500" />
            </button>
        </div>
    );
}
