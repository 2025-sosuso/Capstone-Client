/*
import React, {useRef} from "react";
import YouTube, {YouTubeProps} from "react-youtube";


// test
interface VideoInfo {
    title: string;
    channel: string;
    viewCount: number;
    published: string;
    thumbnailUrl: string;
}

export const info: VideoInfo = {
    title: "🇨🇭찰승헌스위스🇨🇭여행 브이로그!!!",
    channel: "찰스엔터",
    viewCount: 525971,
    published: "23시간 전",
    thumbnailUrl: ""
};
//

interface YouTubePlayerRef {
    seekToTime: (seconds: number) => void;
}

interface YouTubePlayerProps {
    videoId: string;
    onReadyRef?: (ref: YouTubePlayerRef) => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, onReadyRef }) => {
    const playerRef = useRef<YT.Player | null>(null);

    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
        playerRef.current = event.target;

        if (onReadyRef) {
            onReadyRef({
                seekToTime: (seconds: number) => {
                    playerRef.current?.seekTo(seconds, true);
                },
            });
        }
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
                <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady}/>

            </div>
            <div className="max-w-md w-full overflow-hidden">
               {/!* <Link href='/anal' className="cursor-pointer">
                    <h3 className="text-lg font-semibold">{info.title}</h3>
                    <p className="text-sm text-gray-600">{info.channel} | 조회수 {info.viewCount}회</p>
                    <p className="text-sm text-gray-500">{info.published}</p>
                </Link>*!/}
            </div>
        </>
    )
        ;
};

export default YouTubePlayer;
*/
