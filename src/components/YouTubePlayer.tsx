"use client";

import dynamic from "next/dynamic";
import {useRef} from "react";
import {YouTubeProps} from "react-youtube";
import Timeline from "@/components/Timeline";

const YouTube = dynamic(() => import("react-youtube"), { ssr: false });

export default function YouTubePlayer() {
    const playerRef = useRef<any>(null);

    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
        playerRef.current = event.target;
    };

    const seekToTime = (seconds: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(seconds, true);
        }
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
            <YouTube videoId="_lH2UgHzL7Y" opts={opts} onReady={onPlayerReady} />
            <div className="mt-4 flex gap-2">
                <button onClick={() => seekToTime(30)}>▶️ 30초로 이동</button>
                <button onClick={() => seekToTime(60)}>▶️ 1분으로 이동</button>
                <button onClick={() => seekToTime(1300)}>▶️ 2분으로 이동</button>
            </div>
            <Timeline timeline='02:00' />
        </div>
    );
}
