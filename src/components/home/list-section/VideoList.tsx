import { mockVideoData } from '@/mock/video';
import VideoItem from './VideoItem';
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function VideoList({type}: {type: string}) {
    return (
        <div className="flex flex-col w-full gap-5 py-5">
            <Link href={`/${type}`} className="flex justify-between w-full">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {type === "trend" ? "🔥 인기 급상승" : "🔖 스크랩"}
                </h1>
                    <ChevronRightIcon className="size-6"/>
            </Link>
            <div className="flex flex-col gap-5">
                {mockVideoData.map((v, i) => (
                    <VideoItem
                        key={v.id}
                        rank={i + 1}
                        title={v.title}
                        thumbnailUrl={v.thumbnailUrl}
                        channelName={v.channel.name}
                        subscriberCount={v.channel.subscriberCount}
                        uploadAt={v.stats.uploadedAt}
                        views={v.stats.views}
                        commentsCount={v.stats.commentsCount}
                        likes={v.stats.likes}
                        emotionRatio={v.emotionRatio}
                        keywords={v.keywordSummary}
                        aiSummary={v.aiSummary.summaryText}
                    />
                ))}
            </div>
        </div>
    );
}
