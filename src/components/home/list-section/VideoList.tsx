import VideoItem from './VideoItem';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { VideoSummary } from "@/types/new-video";

interface VideoListProps {
    type: "trend" | "scrap";
    data: VideoSummary[];
}

export default function VideoList({ type, data }: VideoListProps) {
    return (
        <div className="flex flex-col w-full gap-5 py-5">
            <Link href={`/${type}`} className="flex justify-between w-full">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {type === "trend" ? "🔥 인기 급상승" : "🔖 스크랩"}
                </h1>
                <ChevronRightIcon className="size-6" />
            </Link>
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
        </div>
    );
}
