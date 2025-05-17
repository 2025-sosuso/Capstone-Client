import {ChannelData} from "@/types/channel";
import Image from "next/image";
import {HeartIcon} from "@heroicons/react/24/solid";
import {useState} from "react";

interface Props {
    channel: ChannelData;
}

export default function SearchChannelResultItem({channel}: Props) {
    const [isLike, setIsLike] = useState(false);  // 세션 기반으로 수정 필요


    return (
        <div className="flex items-center w-full gap-5 h-[90px]">
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
                    <p className="text-sm text-gray-500">구독자 {channel.subscriberCount}명</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{channel.description}</p>
                </div>
            </div>
            <HeartIcon
                className={`size-9 ${isLike ? "text-gray-800" : "text-gray-300"} cursor-pointer transition-colors`}
                onClick={() => setIsLike(!isLike)}
            />
        </div>
    );
}
