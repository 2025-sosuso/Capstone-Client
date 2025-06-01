'use client'

import Image from "next/image";
import {useState} from "react";
import {ExclamationTriangleIcon} from "@heroicons/react/16/solid";

export default function Thumbnail({src}: { src: string }) {
    const [hasError, setHasError] = useState(false);
    const showImage = src && src.trim() !== "" && !hasError;

    return (
        <div className="relative w-full max-w-[360px] aspect-video rounded-2xl overflow-hidden bg-gray-200">
            {showImage ? (
                <Image
                    src={src}
                    alt="썸네일"
                    fill
                    className="object-cover"
                    sizes="(max-width: 360px) 100vw, 360px"
                    onError={() => setHasError(true)}
                />
            ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    <ExclamationTriangleIcon className="size-8 stroke-2 text-gray-400"/>
                </div>
            )}
        </div>
    );
}