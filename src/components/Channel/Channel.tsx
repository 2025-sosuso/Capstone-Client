'use client';

import Image, {StaticImageData} from 'next/image';
import profileImg1 from '@assets/profile1.png';
import { AdjustmentsVerticalIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const channels = [
    { img: profileImg1, name: '쵱갱갱' },
    { img: profileImg1, name: '강옐옐' },
    { img: profileImg1, name: '주헤헤' },
    { img: profileImg1, name: '소밍밍' },
];

interface ChannelProps {
    img: StaticImageData;
    name: string;
    edit: boolean;
}

const ChannelItem = ({ img, name, edit }: ChannelProps) => {
    const HandleClick = () => {
        console.log(name);
    };

    return (
        <div className="flex flex-col items-center justify-center cursor-pointer" onClick={HandleClick}>
            <div className="relative flex items-center justify-center">
                {edit && (
                    <MinusIcon className="absolute z-10 size-10 text-gray-50 stroke-2" />
                )}
                <Image
                    className={`size-15 rounded-full transition duration-200 ${edit ? 'brightness-60' : 'brightness-100'}`}
                    src={img}
                    alt="channel-profile"
                />
            </div>
            <span>{name}</span>
        </div>
    );
};

const Channel = () => {
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
        console.log(edit);
    };

    return (
        <div className="flex items-start justify-between">
            <div className="flex gap-3">
                {channels.map((channel, i) => (
                    <ChannelItem img={channel.img} name={channel.name} edit={edit} key={i} />
                ))}
            </div>
            <button className="cursor-pointer" onClick={handleEdit}>
                <AdjustmentsVerticalIcon className="size-6 text-gray-500" />
            </button>
        </div>
    );
};

export default Channel;
