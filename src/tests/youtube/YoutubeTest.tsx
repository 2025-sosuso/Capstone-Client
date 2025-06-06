// import {useRef} from "react";
// import YouTubePlayer from "./YouTubePlayer";
// import Timeline from "./Timeline";
//
// interface YouTubePlayerRef {
//     seekToTime: (seconds: number) => void;
// }
//
// const timelines = ["00:10", "00:30", "01:00"];
//
// const YoutubeTest = () => {
//     const playerRef = useRef<YouTubePlayerRef | null>(null);
//
//     const handleSeek = (seconds: number) => {
//         playerRef.current?.seekToTime(seconds);
//     };
//
//     return (
//         <div className="flex flex-col items-center gap-4 p-4">
//             <YouTubePlayer videoId="IbxI43fHWnk" onReadyRef={(ref) => (playerRef.current = ref)} />
//             <div className="flex gap-2">
//                 {timelines.map((t, i) => (
//                     <Timeline key={i} timeline={t} seekToTime={handleSeek} />
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default YoutubeTest;
