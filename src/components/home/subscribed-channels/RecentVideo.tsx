'use client';

import ChannelAvatarList from "@components/home/subscribed-channels/ChannelAvatarList";
import Thumbnail from "@components/home/Thumbnail";
import {formatDate, formatNumber} from "@/utils/data-format";
import { VideoSummaryResponse } from "@/types/video-summary";
import SummarySection from "@components/common/VideoSummary/SummarySection";
import {
    FaceSmileIcon,
    HashtagIcon,
    HeartIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import AISummary from "@components/common/AISummary";
import SentimentBar from "@components/common/SentimentBar/SentimentBar";
import TagList from "@components/common/Tag/TagList";
import CommentSlider from "@components/common/Comment/CommentSlider";
import {useRouter} from "next/navigation";

const RecentVideo = ({ data }: { data: VideoSummaryResponse["data"] }) => {
    const router = useRouter();
    const { video, channel, analysis } = data;

    return (
        <>
            <ChannelAvatarList/>
            <div className="flex flex-col flex-wrap sm:flex-row w-full gap-6 items-start bg-white/90 p-4 rounded-2xl">
                <div
                    className="flex flex-col gap-3 w-full sm:w-auto sm:min-w-[320px] sm:max-w-[480px] flex-shrink-0 cursor-pointer"
                    onClick={() => router.push(`/detail/${video.id}`)}>
                    <div className="overflow-hidden rounded-2xl w-full">
                        <Thumbnail src={video.thumbnailUrl}/>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-base font-semibold line-clamp-2">{video.title}</p>
                        <div className="flex flex-wrap text-sm text-gray-500 gap-x-3">
                            <span>{channel.title}</span>
                            <span>조회수{formatNumber(video.viewCount)}회</span>
                            <span>{formatDate(video.publishedAt)}</span>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col gap-2 flex-1 w-full">
                    <SummarySection
                        icon={<SparklesIcon className="size-5 stroke-2"/>}
                        title="AI 댓글 요약"
                    >
                        <AISummary summary={analysis.summary} size="sm"/>
                    </SummarySection>
                    <SummarySection
                        icon={<FaceSmileIcon className="size-5 stroke-2"/>}
                        title="감정 분석"
                    >
                        <SentimentBar
                            ratio={analysis.sentimentDistribution}
                            size="sm"
                        />
                    </SummarySection>
                    <SummarySection
                        icon={<HashtagIcon className="size-5 stroke-2"/>}
                        title="키워드 분석"
                    >
                        <TagList tags={analysis.keywords} size="sm"/>
                    </SummarySection>
                    <SummarySection
                        icon={<HeartIcon className="size-5 stroke-2"/>}
                        title="좋아요 Top 5"
                    >
                        <CommentSlider comments={analysis.topComments || []}/>
                    </SummarySection>
                </div>
            </div>
        </>
    );
};

export default RecentVideo;
