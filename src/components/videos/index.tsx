"use client";

import VideoInfo from "@components/videos/video-info";
import SectionLayout from "@components/videos/SectionLayout";
import CommentList from "@components/common/Comment/CommentList";
import LanguageChart from "@components/videos/LanguageChart";
import CommentTimeChart from "@components/videos/CommentTimeChart";
import TagList from "@components/common/Tag/TagList";
import AISummary from "@components/common/AISummary";
import SentimentBar from "@components/common/SentimentBar/SentimentBar";
import WarningBanner from "@components/videos/WarningBanner";
import LoadingSection from "@components/common/LoadingSection";
import {useVideoDetail} from "@/hooks/useVideoDetail";

export default function Detail({videoId}: { videoId: string }) {
    const {
        basicInfo,
        analysisInfo,
        comments,
        aiAnalysis,
        filteredComments,
        keywordComments,
        selectedKeyword,
        isLoading,
        error,
        playerRef,
        handleSeek,
        handleFilterComments,
        handleKeywordFilter,
        handleSearch,
    } = useVideoDetail(videoId);

    // 기본 정보 로딩 중이거나 에러 시
    if (isLoading.basic) return <LoadingSection message="데이터를 불러오고 있습니다..."/>;
    if (error || !basicInfo) return <div className="text-center mt-10 text-gray-500">영상을 불러올 수 없습니다.</div>;

    return (
        <div className="flex flex-col w-full px-3 py-5 items-center max-w-[1000px] m-auto gap-5">
            {aiAnalysis?.isWarning && <WarningBanner/>}

            <VideoInfo
                data={{
                    video: basicInfo.video,
                    channel: basicInfo.channel,
                    analysis: {
                        summary: aiAnalysis?.summary ?? '',
                        isWarning: aiAnalysis?.isWarning ?? false,
                        topComments: analysisInfo?.topComments ?? [],
                        languageDistribution: aiAnalysis?.languageDistribution ?? [],
                        sentimentDistribution: aiAnalysis?.sentimentDistribution ?? {
                            positive: 0,
                            negative: 0,
                            other: 0
                        },
                        popularTimestamps: analysisInfo?.popularTimestamps ?? [],
                        commentHistogram: analysisInfo?.commentHistogram ?? [],
                        keywords: aiAnalysis?.keywords ?? [],
                    },
                    comments: comments,
                }}
                onPlayerReady={(ref) => (playerRef.current = ref)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 md:gap-10">
                <div className="flex flex-col gap-5 md:gap-10">
                    <SectionLayout header="AI 전체 요약">
                        {isLoading.ai ? (
                            <LoadingSection message="AI 분석 중..."/>
                        ) : (
                            <AISummary summary={aiAnalysis?.summary ?? null}/>
                        )}
                    </SectionLayout>

                    <SectionLayout header="좋아요 Top 5">
                        {isLoading.analysis ? (
                            <LoadingSection message="인기 댓글 로딩 중..."/>
                        ) : (
                            <CommentList comments={analysisInfo?.topComments ?? []}/>
                        )}
                    </SectionLayout>

                    <SectionLayout
                        header="전체 댓글 확인하기"
                        type="search-comment"
                        onSearch={handleSearch}
                    >
                        {isLoading.ai ? (
                            <LoadingSection message="감정 분석 중..."/>
                        ) : (
                            <SentimentBar
                                ratio={aiAnalysis?.sentimentDistribution ?? {positive: 0, negative: 0, other: 0}}
                                onClick={(sentiment) => handleFilterComments({sentiment})}
                            />
                        )}
                        {isLoading.comments ? (
                            <LoadingSection message="댓글 로딩 중..."/>
                        ) : (
                            <CommentList comments={filteredComments}/>
                        )}
                    </SectionLayout>
                </div>

                <div className="flex flex-col gap-5 md:gap-10">
                    <SectionLayout header="언어 비율">
                        {isLoading.ai ? (
                            <LoadingSection message="언어 분석 중..."/>
                        ) : (
                            <LanguageChart data={aiAnalysis?.languageDistribution ?? []}/>
                        )}
                    </SectionLayout>

                    <SectionLayout header="가장 많이 언급한 시간대">
                        {isLoading.analysis ? (
                            <LoadingSection message="타임스탬프 분석 중..."/>
                        ) : (
                            <TagList
                                tags={(analysisInfo?.popularTimestamps ?? []).map(t => t.time)}
                                onTagClick={handleSeek}
                            />
                        )}
                    </SectionLayout>

                    <SectionLayout header="댓글 작성 시간대">
                        {isLoading.analysis ? (
                            <LoadingSection message="시간대 분석 중..."/>
                        ) : (
                            <CommentTimeChart data={analysisInfo?.commentHistogram ?? []}/>
                        )}
                    </SectionLayout>

                    <SectionLayout header="키워드 분석">
                        {isLoading.ai ? (
                            <LoadingSection message="키워드 분석 중..."/>
                        ) : (
                            <>
                                <TagList
                                    tags={aiAnalysis?.keywords ?? []}
                                    onTagClick={handleKeywordFilter}
                                    selectedTag={selectedKeyword}
                                    highlightSelected={true}
                                />
                                {isLoading.comments ? (
                                    <LoadingSection message="댓글 로딩 중..."/>
                                ) : (
                                    <CommentList comments={keywordComments}/>
                                )}
                            </>
                        )}
                    </SectionLayout>
                </div>
            </div>
        </div>
    );
}