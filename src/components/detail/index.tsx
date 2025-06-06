import VideoInfo from "@components/detail/video-info";
import SectionLayout from "@components/detail/SectionLayout";
import CommentList from "@components/common/Comment/CommentList";
import LanguageChart from "@components/detail/LanguageChart";
import CommentTimeChart from "@components/detail/CommentTimeChart";
import TagList from "@components/common/Tag/TagList";
import AISummary from "@components/common/AISummary";
import SentimentBar from "@components/common/SentimentBar/SentimentBar";
import { mockVideoResponse } from "@mock/video-mock";
import type { VideoResult } from "@/types/video";

export default function Detail() {
    const data: VideoResult = mockVideoResponse.data.results[0];

    const { analysis, comments } = data;
    const {
        summary,
        topComments,
        languageDistribution,
        sentimentDistribution,
        popularTimestamps,
        commentHistogram,
        keywords,
    } = analysis;

    return (
        <div className="flex flex-col w-full items-center max-w-[1000px] m-auto gap-10">
            <VideoInfo data={data} />

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
                <div className="col-auto flex flex-col gap-10">
                    <SectionLayout header="AI 전체 요약">
                        <AISummary summary={summary} />
                    </SectionLayout>

                    <SectionLayout header="좋아요 Top 5">
                        <CommentList comments={topComments} />
                    </SectionLayout>

                    <SectionLayout header="전체 댓글 확인하기" type="search-comment">
                        <SentimentBar ratio={{
                            positive: sentimentDistribution.positive,
                            negative: sentimentDistribution.negative,
                            other: sentimentDistribution.other
                        }} />
                        <CommentList comments={comments} />
                    </SectionLayout>
                </div>

                <div className="col-auto flex flex-col gap-10">
                    <SectionLayout header="언어 비율">
                        <LanguageChart data={languageDistribution} />
                    </SectionLayout>

                    <SectionLayout header="가장 많이 언급한 시간대">
                        <TagList tags={popularTimestamps.map(t => t.time)} />
                    </SectionLayout>

                    <SectionLayout header="댓글 작성 시간대">
                        <CommentTimeChart data={commentHistogram} />
                    </SectionLayout>

                    <SectionLayout header="키워드 분석">
                        <TagList tags={keywords} />
                        <CommentList comments={comments} />
                    </SectionLayout>
                </div>
            </div>
        </div>
    );
}
