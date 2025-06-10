'use client';
import React, { useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export interface YouTubePlayerRef {
    seekToTime: (seconds: number) => void;
}

interface Props {
    videoId: string;
    onReadyRef?: (ref: YouTubePlayerRef) => void;
}

export default function YouTubePlayer({ videoId, onReadyRef }: Props) {
    const playerRef = useRef<YT.Player | null>(null);
    const durationRef = useRef<number>(0); // 영상 길이 저장

    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
        playerRef.current = event.target;
        if (playerRef.current) {
            durationRef.current = playerRef.current.getDuration();
        }

        if (onReadyRef) {
            onReadyRef({
                seekToTime: (seconds: number) => {
                    const maxTime = durationRef.current || 0;
                    const clampedTime = Math.min(seconds, maxTime - 1);
                    playerRef.current?.seekTo(clampedTime, true);
                },
            });
        }
    };

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
        <div className="relative w-full h-fit aspect-[16/9] overflow-hidden rounded-2xl">
            <YouTube
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                videoId={videoId}
                opts={opts}
                onReady={onPlayerReady}
            />
        </div>
    );
}
