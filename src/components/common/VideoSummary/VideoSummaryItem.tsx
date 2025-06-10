'use client';

import { useRouter } from "next/navigation";
import Thumbnail from "@components/home/Thumbnail";
import SentimentBar from "@components/common/SentimentBar/SentimentBar";
import AISummary from "@components/common/AISummary";
import { FaceSmileIcon, HashtagIcon, SparklesIcon } from "@heroicons/react/24/outline";
import SummarySection from "@components/common/VideoSummary/SummarySection";
import TagList from "@components/common/Tag/TagList";
import type { VideoSummaryResponse } from "@/types/video-summary";
import {formatDate, formatNumber} from "@/utils/data-format";

type Props = {
    rank?: number;
    data: VideoSummaryResponse["data"];
};

export default function VideoSummaryItem({ rank, data }: Props) {
    const router = useRouter();
    const { video, channel, analysis } = data;

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div
                className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0 cursor-pointer"
                onClick={() => router.push(`/detail/${video.id}`)}
            >
                {rank !== undefined && (
                    <span className="text-xl font-bold w-6">{rank}</span>
                )}

                <div className="w-full sm:w-[280px] flex-shrink-0 overflow-hidden rounded-2xl">
                    <Thumbnail src={video.thumbnailUrl} />
                </div>

                <div className="flex flex-col  flex-1 min-w-0">
                    <p className="font-semibold text-base line-clamp-2">{video.title}</p>
                    <p className="text-sm text-gray-500">
                        {channel.title} | 구독자 {formatNumber(channel.subscriberCount)}명
                    </p>
                    <p className="text-sm text-gray-500">
                        조회수 {formatNumber(video.viewCount)} · 업로드일 {formatDate(video.publishedAt)}
                    </p>
                    <p className="text-sm text-gray-400">
                        좋아요 {formatNumber(video.likeCount)}개 · 댓글 {formatNumber(video.commentCount)}개
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-[40%]">
                <SummarySection icon={<SparklesIcon className="size-5 stroke-2" />}>
                    <AISummary summary={analysis.summary} size="sm" />
                </SummarySection>

                <SummarySection icon={<FaceSmileIcon className="size-5 stroke-2" />}>
                    <SentimentBar ratio={analysis.sentimentDistribution} size="sm" />
                </SummarySection>

                <SummarySection icon={<HashtagIcon className="size-5 stroke-2" />}>
                    <TagList tags={analysis.keywords} size="sm" />
                </SummarySection>
            </div>
        </div>
    );
}
