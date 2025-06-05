
import VideoItem from './VideoItem';
import {VideoSummary} from "@/types/new-video";
import {useAuth} from "@/contexts/AuthContext";
import LoginButton from "@components/common/LoginButton";

interface Props {
    type?: string;
    data: VideoSummary[];
}

export default function VideoList({data, type="trending"}: Props) {
    const { isLoggedIn, handleLogin } = useAuth();

    if (type === "scrap" && !isLoggedIn) {
        return (
            <div className="flex flex-col w-full items-center justify-center text-center py-10 gap-5 bg-gray-50 rounded-2xl">
                지금 로그인하고, 스크랩 영상을 빠르게 확인해보세요!
                <LoginButton isLoggedIn={isLoggedIn} onClick={handleLogin}/>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {data.slice(0, 3).map((d, i) => (
                <VideoItem
                    key={i}
                    rank={i + 1}
                    title={d.title}
                    thumbnailUrl={d.thumbnailUrl}
                    publishedAt={d.publishedAt}
                    viewCount={d.viewCount}
                    likeCount={d.likeCount}
                    commentsCount={d.commentCount}
                    channel={d.channel}
                    analysis={d.analysis}
                />
            ))}
        </div>
    );
}
