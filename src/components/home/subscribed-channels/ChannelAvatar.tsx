// components/channel/ChannelAvatar.tsx
import Image from 'next/image';
import { MinusIcon } from '@heroicons/react/24/outline';

interface ChannelAvatarProps {
    thumbnailUrl: string;
    title: string;
    edit: boolean;
    onClick?: () => void;
}

export default function ChannelAvatar({
                                          thumbnailUrl,
                                          title,
                                          edit,
                                          onClick,
                                      }: ChannelAvatarProps) {
    return (
        <div
            className="flex flex-col items-center justify-center cursor-pointer w-16 shrink-0 gap-1"
            onClick={onClick}
        >
            <div className="relative flex items-center justify-center">
                {edit && (
                    <MinusIcon className="absolute z-10 size-10 text-gray-50 stroke-2" />
                )}
                <Image
                    className={`size-16 rounded-full transition duration-200 ${edit ? 'brightness-60' : 'brightness-100'}`}
                    src={thumbnailUrl || '/default-profile.png'}
                    alt="channel-profile"
                    width={64}
                    height={64}
                    unoptimized
                />
            </div>
            <span className="text-center text-[0.8rem] truncate">{title}</span>
        </div>
    );
}
