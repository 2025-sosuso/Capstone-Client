"use client";

import VideoInfo from "@/app/videos/[videoId]/_components/VideoInfo/VideoInfo";
import SectionLayout from "@components/Video/SectionLayout";
import CommentList from "@components/Video/Comment/CommentList";
import LanguageChart from "@components/Video/LanguageChart";
import CommentTimeChart from "@components/Video/CommentTimeChart";
import TagList from "@components/Video/Tag/TagList";
import AISummary from "@components/Video/AISummary";
import SentimentBar from "@components/Video/SentimentBar/SentimentBar";
import WarningBanner from "@/app/videos/[videoId]/_components/WarningBanner";
import SentimentFlowChart from "@components/Video/SentimentFlowChart";
import {useVideoDetail} from "@/hooks/useVideoDetail";
import {useMemo} from "react";
import {ErrorState, LoadingSection} from "@components/ui";

export default function Videos({videoId}: { videoId: string }) {
    const {data, filtered, state, actions, playerRef} = useVideoDetail(videoId);

    const {basicInfo, userState, analysisInfo, aiAnalysis} = data;
    const {isLoading, error} = state;

    const timestampTags = useMemo(() =>
            (analysisInfo?.popularTimestamps ?? []).map(t => t.time),
        [analysisInfo?.popularTimestamps]
    );

    if (isLoading.basic) return <LoadingSection message="데이터를 불러오고 있습니다..."/>;
    if (error || !basicInfo) {
        return <ErrorState
            title="영상을 불러올 수 없습니다"
            onRetry={() => window.location.reload()}
        />
    }


    return (
        <div className="flex flex-col w-full px-3 py-5 items-center max-w-[1000px] m-auto gap-5">
            {aiAnalysis?.isWarning && <WarningBanner/>}

            <VideoInfo
                data={basicInfo}
                userState={userState}
                onPlayerReady={(ref) => (playerRef.current = ref)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 md:gap-10">
                <div className="flex flex-col gap-5 md:gap-10">
                    <SectionLayout header="AI 전체 요약">
                        <AISummary
                            summary={aiAnalysis?.summary ?? null}
                            isLoading={isLoading.ai}
                        />
                    </SectionLayout>

                    <SectionLayout header="좋아요 Top 5">
                        <CommentList comments={analysisInfo?.topComments ?? []}/>
                    </SectionLayout>

                    <SectionLayout
                        header="전체 댓글 확인하기"
                        type="search-comment"
                        onSearch={actions.handleSearch}
                    >
                        <SentimentBar
                            ratio={aiAnalysis?.sentimentDistribution ?? {positive: 0, negative: 0, other: 0}}
                            onClick={(sentiment) => actions.handleFilterComments({sentiment})}
                            isLoading={isLoading.ai}
                        />
                        <CommentList comments={filtered.comments}/>
                    </SectionLayout>
                </div>

                <div className="flex flex-col gap-5 md:gap-10">
                    <SectionLayout header="언어 비율">
                        <LanguageChart data={aiAnalysis?.languageDistribution ?? []}/>
                    </SectionLayout>

                    <SectionLayout header="가장 많이 언급한 시간대">
                        <TagList
                            tags={timestampTags}
                            onTagClick={actions.handleSeek}
                        />
                    </SectionLayout>

                    <SectionLayout header="댓글 반응 흐름 분석">
                        <SentimentFlowChart data={analysisInfo?.sentimentFlow ?? []}/>
                    </SectionLayout>

                    <SectionLayout header="댓글 작성 시간대">
                        <CommentTimeChart data={analysisInfo?.commentHistogram ?? []}/>
                    </SectionLayout>

                    <SectionLayout header="키워드 분석">
                        <TagList
                            tags={aiAnalysis?.keywords ?? []}
                            onTagClick={actions.handleKeywordFilter}
                            selectedTag={filtered.selectedKeyword}
                            highlightSelected={true}
                            isLoading={isLoading.ai}
                        />
                        <CommentList comments={filtered.keywordComments}/>
                    </SectionLayout>
                </div>
            </div>
        </div>
    );
}