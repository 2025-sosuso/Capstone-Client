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
import {useMemo} from "react";
import SentimentFlowChart from "@components/videos/SentimentFlowChart";

export default function Detail({videoId}: { videoId: string }) {
    const {data, filtered, state, actions, playerRef} = useVideoDetail(videoId);

    const timestampTags = useMemo(() =>
            (data.analysisInfo?.popularTimestamps ?? []).map(t => t.time),
        [data.analysisInfo?.popularTimestamps]
    );

    if (state.isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-4">
                <div className="relative">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🎥</span>
                    </div>
                </div>

                <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold text-gray-800">
                        영상을 분석하고 있습니다
                    </h2>
                    <p className="text-gray-600">
                        YouTube에서 데이터를 수집하고 AI 분석을 진행 중입니다.
                    </p>
                    <p className="text-sm text-gray-500">
                        재시도 {state.retryCount}/24 · 최대 2분 정도 소요될 수 있습니다.
                    </p>
                </div>

                <div className="w-full max-w-md">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                            style={{width: `${(state.retryCount / 24) * 100}%`}}
                        />
                    </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg max-w-md">
                    <p className="text-sm text-blue-800">
                        💡 <strong>팁:</strong> 이 페이지를 닫지 마세요.
                        분석이 완료되면 자동으로 표시됩니다.
                    </p>
                </div>
            </div>
        );
    }

    if (state.isLoading.basic) return <LoadingSection message="데이터를 불러오고 있습니다..."/>;

    if (state.error || !data.basicInfo) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
                <span className="text-6xl">😕</span>
                <h2 className="text-2xl font-bold text-gray-800">영상을 불러올 수 없습니다</h2>
                <p className="text-gray-600 text-center">
                    영상 처리 중 문제가 발생했습니다.<br/>
                    잠시 후 다시 시도해주세요.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    새로고침
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full px-3 py-5 items-center max-w-[1000px] m-auto gap-5">
            {data.aiAnalysis?.isWarning && <WarningBanner/>}

            <VideoInfo
                data={data.basicInfo}
                onPlayerReady={(ref) => (playerRef.current = ref)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 md:gap-10">
                <div className="flex flex-col gap-5 md:gap-10">
                    <SectionLayout header="AI 전체 요약">
                        {state.isLoading.ai ? (
                            <LoadingSection message="AI 분석 중..."/>
                        ) : (
                            <AISummary summary={data.aiAnalysis?.summary ?? null}/>
                        )}
                    </SectionLayout>

                    <SectionLayout header="좋아요 Top 5">
                        {state.isLoading.analysis ? (
                            <LoadingSection message="인기 댓글 로딩 중..."/>
                        ) : (
                            <CommentList comments={data.analysisInfo?.topComments ?? []}/>
                        )}
                    </SectionLayout>

                    <SectionLayout
                        header="전체 댓글 확인하기"
                        type="search-comment"
                        onSearch={actions.handleSearch}
                    >
                        {state.isLoading.ai ? (
                            <LoadingSection message="감정 분석 중..."/>
                        ) : (
                            <SentimentBar
                                ratio={data.aiAnalysis?.sentimentDistribution ?? {positive: 0, negative: 0, other: 0}}
                                onClick={(sentiment) => actions.handleFilterComments({sentiment})}
                            />
                        )}
                        {state.isLoading.comments ? (
                            <LoadingSection message="댓글 로딩 중..."/>
                        ) : (
                            <CommentList comments={filtered.comments}/>
                        )}
                    </SectionLayout>
                </div>

                <div className="flex flex-col gap-5 md:gap-10">
                    <SectionLayout header="언어 비율">
                        {state.isLoading.ai ? (
                            <LoadingSection message="언어 분석 중..."/>
                        ) : (
                            <LanguageChart data={data.aiAnalysis?.languageDistribution ?? []}/>
                        )}
                    </SectionLayout>

                    <SectionLayout header="가장 많이 언급한 시간대">
                        {state.isLoading.analysis ? (
                            <LoadingSection message="타임스탬프 분석 중..."/>
                        ) : (
                            <TagList
                                tags={timestampTags}
                                onTagClick={actions.handleSeek}
                            />
                        )}
                    </SectionLayout>

                    <SectionLayout header="댓글 반응 흐름 분석" >
                        {state.isLoading.analysis ? (
                            <LoadingSection message="댓글 반응 흐름 분석 분석 중..."/>
                        ) : (
                            <SentimentFlowChart />
                        )}
                    </SectionLayout>

                    <SectionLayout header="댓글 작성 시간대">
                        {state.isLoading.analysis ? (
                            <LoadingSection message="시간대 분석 중..."/>
                        ) : (
                            <CommentTimeChart data={data.analysisInfo?.commentHistogram ?? []}/>
                        )}
                    </SectionLayout>

                    <SectionLayout header="키워드 분석">
                        {state.isLoading.ai ? (
                            <LoadingSection message="키워드 분석 중..."/>
                        ) : (
                            <>
                                <TagList
                                    tags={data.aiAnalysis?.keywords ?? []}
                                    onTagClick={actions.handleKeywordFilter}
                                    selectedTag={filtered.selectedKeyword}
                                    highlightSelected={true}
                                />
                                {state.isLoading.comments ? (
                                    <LoadingSection message="댓글 로딩 중..."/>
                                ) : (
                                    <CommentList comments={filtered.keywordComments}/>
                                )}
                            </>
                        )}
                    </SectionLayout>
                </div>
            </div>
        </div>
    );
}