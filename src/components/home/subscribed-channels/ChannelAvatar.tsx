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
    const validTitle = title?.trim() || '알 수 없음';
    const isValidThumbnail =
        typeof thumbnailUrl === 'string' && thumbnailUrl.trim().startsWith('http');

    return (
        <div
            className="flex flex-col items-center justify-start cursor-pointer w-20 shrink-0 gap-2"
            onClick={onClick}
        >
            <div className="relative flex items-center justify-center">
                {edit && (
                    <MinusIcon className="absolute z-10 size-10 text-gray-50 stroke-2"/>
                )}

                {isValidThumbnail ? (
                    <Image
                        className={`rounded-full transition duration-200 ${edit ? 'brightness-60' : 'brightness-100'}`}
                        src={thumbnailUrl}
                        alt={validTitle}
                        width={72}
                        height={72}
                        unoptimized
                    />
                ) : (
                    <div className="w-[72px] h-[72px] rounded-full bg-gray-300"/>
                )}
            </div>
            <span
                title={validTitle}
                className="text-center text-sm text-gray-800 leading-snug max-w-[72px] line-clamp-2"
            >
            {validTitle}
            </span>

        </div>
    );
}
