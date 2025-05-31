import {FC} from 'react';
import Thumbnail from "@components/home/Thumbnail";
import EmotionBar from "@components/common/EmotionBar/EmotionBar";
import AISummary from "@components/common/AISummary";
import {Channel, SummaryAnalysis} from "@/types/new-video";
import {FaceSmileIcon, HashtagIcon, SparklesIcon} from "@heroicons/react/24/outline";
import SummarySection from "@components/home/list-section/SummarySection";
import TagList from "@components/common/Tag/TagList";

type TrendVideoItemProps = {
    rank: number;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
    viewCount: number;
    commentsCount: number;
    likeCount: number;
    channel: Channel;
    analysis: SummaryAnalysis;
};

const VideoItem: FC<TrendVideoItemProps> = ({
                                                rank,
                                                title,
                                                thumbnailUrl,
                                                publishedAt,
                                                viewCount,
                                                likeCount,
                                                commentsCount,
                                                channel,
                                                analysis,
                                            }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex gap-6 flex-1 min-w-0 cursor-pointer">
                <span className="text-xl font-bold w-6">{rank}</span>
                <div className="w-[260px] overflow-hidden rounded-2xl">
                    <Thumbnail src={thumbnailUrl}/>
                </div>
                <div className="flex flex-col flex-1 min-h-[60px] w-2/5">
                    <p className="font-semibold line-clamp-2">{title}</p>
                    <p className="text-sm text-gray-500">
                        {channel.title} | 구독자 {channel.subscribeCount.toLocaleString()}명
                    </p>
                    <p className="text-sm text-gray-500">
                        조회수 {viewCount.toLocaleString()} · 업로드일 {new Date(publishedAt).toLocaleDateString("ko-KR")}
                    </p>
                    <p className="text-sm text-gray-400">
                        좋아요 {likeCount.toLocaleString()}개 · 댓글 {commentsCount.toLocaleString()}개
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-0 max-w-2/5">
                <SummarySection icon={<SparklesIcon className="size-5 stroke-2"/>}>
                    <AISummary summary={analysis.aiSummary} size="sm"/>
                </SummarySection>

                <SummarySection icon={<HashtagIcon className="size-5 stroke-2"/>}>
                    <EmotionBar ratio={analysis.emotionRatio} size="sm"/>
                </SummarySection>

                <SummarySection icon={<FaceSmileIcon className="size-5 stroke-2"/>}>
                    <TagList tags={analysis.keywordTags} size="sm"/>
                </SummarySection>

            </div>
        </div>
    );
};

export default VideoItem;
