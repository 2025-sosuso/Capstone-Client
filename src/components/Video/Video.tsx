import Link from "next/link";
import React, {useRef} from "react";
import YouTube, {YouTubeProps} from "react-youtube";
import {VideoData} from "@/types/before-video";

interface VideoProps {
    video: VideoData;
}


const Video = ({video}: VideoProps) => {
    const playerRef = useRef<any>(null);

    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
        playerRef.current = event.target;
    };

    const opts: YouTubeProps["opts"] = {
        width: "100%",
        height: "210",
        playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
        },
    };

    return (
        <>
            <div className="w-full max-w-sm rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <YouTube videoId={video.id} opts={opts} onReady={onPlayerReady}/>

            </div>
            <div className="max-w-md w-full overflow-hidden">
                <Link href='/anal' className="cursor-pointer">
                    <h3 className="text-lg font-semibold">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.channel.name} | 조회수 {video.stats.views}회</p>
                    <p className="text-sm text-gray-500">{video.stats.uploadedAt}</p>
                </Link>
            </div>
        </>
    )
        ;
};

export default Video;
