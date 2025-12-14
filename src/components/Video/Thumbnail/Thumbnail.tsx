'use client';

import Image from "next/image";
import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

type Props = {
    src: string;
};

export default function Thumbnail({ src }: Props) {
    const [hasError, setHasError] = useState(false);
    const showImage = src && src.trim() !== "" && !hasError;

    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-200">
            {showImage ? (
                <Image
                    src={src}
                    alt="썸네일"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 480px"
                    onError={() => setHasError(true)}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                    <ExclamationTriangleIcon className="size-8 stroke-2 text-gray-400" />
                </div>
            )}
        </div>
    );
}
