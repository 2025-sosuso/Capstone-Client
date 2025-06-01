import VideoItem from './VideoItem';
import {VideoSummary} from "@/types/new-video";

interface Props {
    data: VideoSummary[];
}

export default function VideoList({data}: Props) {
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
