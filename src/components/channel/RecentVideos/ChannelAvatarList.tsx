'use client';

import Image from 'next/image';
import { AdjustmentsVerticalIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { mockVideoData} from "@mock/video";


interface ChannelProps {
    img?: string;
    name: string;
    edit: boolean;
}

const ChannelAvatar = ({ img, name, edit }: ChannelProps) => {
    const handleClick = () => {
        console.log(name);
    };

    return (
        <div className="flex flex-col items-center justify-center cursor-pointer w-16 shrink-0" onClick={handleClick}>
            <div className="relative flex items-center justify-center">
                {edit && (
                    <MinusIcon className="absolute z-10 size-10 text-gray-50 stroke-2" />
                )}
                <Image
                    className={`size-16 rounded-full transition duration-200 ${edit ? 'brightness-60' : 'brightness-100'}`}
                    src={img ?? ''} // 디폴트 이미지 넣어야 함
                    alt="channel-profile"
                    width={64}
                    height={64}
                    unoptimized
                />
            </div>
            <span className="w-full truncate text-center text-sm">{name}</span>
        </div>
    );
};

const ChannelAvatarList = () => {
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    };

    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4 overflow-x-auto">
                {mockVideoData.map((video, i) => (
                    <ChannelAvatar
                        key={i}
                        img={video.channel.profileImageUrl ?? '/default-profile.png'}
                        name={video.channel.name}
                        edit={edit}
                    />
                ))}
            </div>
            <button className="cursor-pointer" onClick={handleEdit}>
                <AdjustmentsVerticalIcon className="size-6 text-gray-500" />
            </button>
        </div>
    );
};


export default ChannelAvatarList;
