import VideoInfo from "@components/detail/video-info";
import SectionLayout from "@components/detail/SectionLayout";
import CommentList from "@components/detail/CommentList";
import LanguageChart from "@components/detail/LanguageChart";
import CommentTimeChart from "@components/detail/CommentTimeChart";
import TagList from "@components/detail/TagList";
import AISummary from "@components/detail/AISummary";
import {mockVideoData} from "@mock/new-video-mock";

export default function Detail() {
    // mock data
    const mockData = mockVideoData.data
    const aiSummary = mockData.video.analysis.aiSummary;
    const commentsAll = mockData.video.comments;
    const commentsTop5 = mockData.video.analysis.commentsTop5;
    const languageRatio = mockData.video.analysis.languageRatio;
    const commentTimes = mockData.video.analysis.commentTimes;
    const popularTimeTags = mockData.video.analysis.popularTimeTags;
    const keywordTags = mockData.video.analysis.keywordTags;

    return (
        <div className="flex flex-col w-full items-center max-w-[1000px] m-auto gap-10">
            <VideoInfo data={mockData.video}/>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
                <div className="col-auto flex flex-col gap-10">
                    <SectionLayout header="AI 전체 요약">
                        <AISummary summary={aiSummary} />
                    </SectionLayout>
                    <SectionLayout header="좋아요 Top 5">
                        <CommentList comments={commentsTop5}/>
                    </SectionLayout>
                    <SectionLayout header="전체 댓글 확인하기">
                        <CommentList comments={commentsAll}/>
                    </SectionLayout>
                </div>

                <div className="col-auto flex flex-col gap-10">
                    <SectionLayout header="언어 비율">
                        <LanguageChart data={languageRatio}/>
                    </SectionLayout>
                    <SectionLayout header="가장 많이 언급한 시간대">
                        <TagList tags={popularTimeTags}/>
                    </SectionLayout>
                    <SectionLayout header="댓글 작성 시간대">
                        <CommentTimeChart data={commentTimes}/>
                    </SectionLayout>
                    <SectionLayout header="키워드 분석">
                        <TagList tags={keywordTags} />
                        <CommentList comments={commentsAll} />
                    </SectionLayout>
                </div>
            </div>
        </div>
    );
}
