'use client';

import {useRouter} from "next/navigation";
import Thumbnail from "@components/common/Thumbnail/Thumbnail";
import VideoInfo from "@components/common/video-preview/VideoInfo";
import {VideoResult} from "@/types";
import AISummary from "@components/common/AISummary";
import SentimentBar from "@components/common/SentimentBar/SentimentBar";
import CommentList from "@components/common/Comment/CommentList";
import LanguageChart from "@components/videos/LanguageChart";
import CommentTimeChart from "@components/videos/CommentTimeChart";
import TagList from "@components/common/Tag/TagList";
import SectionLayout from "@components/videos/SectionLayout";
import {isAIAnalysisComplete} from "@/utils/ai-analysis";
import SentimentFlowChart from "@components/videos/SentimentFlowChart";

interface Props {
    data: VideoResult | null;
}

export default function CompareItem({data}: Props) {
    const router = useRouter();

    if (!data) {
        return (
            <div className="flex-1 min-w-0 flex items-center justify-center bg-gray-100 rounded-lg p-8">
                <p className="text-gray-500">데이터를 불러올 수 없습니다</p>
            </div>
        );
    }

    const aiLoading = !isAIAnalysisComplete(data.analysis);

    const handleThumbnailClick = () => {
        router.push(`/videos/${data.video.id}`);
    };

    return (
        <div className="flex-1 min-w-0 flex flex-col gap-5">
            <div
                onClick={handleThumbnailClick}
                className="bg-white rounded-lg overflow-hidden cursor-pointer"
            >
                <Thumbnail src={data.video.thumbnailUrl}/>
                <div className="p-4">
                    <VideoInfo video={data.video} channel={data.channel}/>
                </div>
            </div>

            <SectionLayout header="AI 전체 댓글 요약">
                <AISummary summary={data.analysis.summary} size="sm" isLoading={aiLoading}/>
            </SectionLayout>

            <SectionLayout header="댓글 감정 비율">
                <SentimentBar ratio={data.analysis.sentimentDistribution} size="sm" isLoading={aiLoading}/>
            </SectionLayout>

            <SectionLayout header="주요 키워드">
                <TagList tags={data.analysis.keywords} size="sm" isLoading={aiLoading}/>
            </SectionLayout>

            <SectionLayout header="언어 비율">
                <LanguageChart data={data.analysis.languageDistribution}/>
            </SectionLayout>

            <SectionLayout header="댓글 작성 시간대">
                <CommentTimeChart data={data.analysis.commentHistogram}/>
            </SectionLayout>

            <SectionLayout header="감정 흐름">
                <SentimentFlowChart data={data.analysis.sentimentFlow ?? []}/>
            </SectionLayout>

            <SectionLayout header="좋아요 Top 5">
                <CommentList comments={data.analysis.topComments}/>
            </SectionLayout>
        </div>
    );
}