import {ChannelSearchResult} from "@/types/channel";
import Image from "next/image";
import {useState} from "react";

interface Props {
    channel: ChannelSearchResult;
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
            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"
                 className={`size-8 ${isLike ? "text-gray-600" : "text-gray-300"} cursor-pointer transition-colors`}
                 onClick={() => setIsLike(!isLike)}>
                <path
                    d="m18.118,35.443c1.144.756,2.621.756,3.765,0,3.631-2.399,11.545-8.132,14.952-14.547,4.494-8.463-.784-16.905-7.757-16.905-3.976,0-6.369,2.077-7.691,3.863-.697.941-2.075.941-2.772,0-1.322-1.786-3.715-3.863-7.691-3.863C3.95,3.991-1.328,12.432,3.166,20.896c3.406,6.415,11.321,12.148,14.952,14.547Z"
                    fill="currentColor"/>
                <rect x="0" y="0" width="40" height="40" fill="none"/>
            </svg>
        </div>
    );
}
