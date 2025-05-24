'use client';
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface Props {
    videoId: string;
}

export default function YouTubePlayer({ videoId }: Props) {
    const opts: YouTubeProps["opts"] = {
        width: "100%",
        height: "100%",
        playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
        },
    };

    return (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl">
            <YouTube
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                videoId={videoId}
                opts={opts}
            />
        </div>
    );
}
