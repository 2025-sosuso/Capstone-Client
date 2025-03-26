"use client";

import dynamic from "next/dynamic";
import {useRef} from "react";
import {YouTubeProps} from "react-youtube";
import Timeline from "@/components/Timeline";

const YouTube = dynamic(() => import("react-youtube"), { ssr: false });
const timelines = ["30:00", "00:39", "00:21"];

export default function YouTubePlayer() {
    const playerRef = useRef<any>(null);

    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
        playerRef.current = event.target;
    };

    const seekToTime = (seconds: number) => {
        if (playerRef.current)
            playerRef.current.seekTo(seconds, true);
    };

    const opts: YouTubeProps["opts"] = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div>
            <YouTube videoId="_lH2UgHzL7Y" opts={opts} onReady={onPlayerReady}/>
            <div className="m-2 flex gap-2">
                {timelines.map((timeline, i) => (
                    <Timeline key={i} timeline={timeline} seekToTime={seekToTime}/>))
                }
            </div>
        </div>
    );
}
