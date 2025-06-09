"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoResult } from "@/types/video";
import type { YouTubePlayerRef } from "@components/detail/video-info/YoutubePlayer";

import VideoInfo from "@components/detail/video-info";
import SectionLayout from "@components/detail/SectionLayout";
import CommentList from "@components/common/Comment/CommentList";
import LanguageChart from "@components/detail/LanguageChart";
import CommentTimeChart from "@components/detail/CommentTimeChart";
import TagList from "@components/common/Tag/TagList";
import AISummary from "@components/common/AISummary";
import SentimentBar from "@components/common/SentimentBar/SentimentBar";
import WarningBanner from "@components/detail/WarningBanner";
import {fetchVideoDetail} from "@/service/videoService";
import LoadingSection from "@components/common/LoadingSection";

export default function Detail({ videoId }: { videoId: string }) {
    const [data, setData] = useState<VideoResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const playerRef = useRef<YouTubePlayerRef | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchVideoDetail(videoId);
                setData(res);
            } catch (err) {
                console.error("영상 정보를 불러오지 못했습니다:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [videoId]);


    const handleSeek = (timeString: string) => {
        const parts = timeString.split(":").map(Number);
        const seconds = parts.reduce((acc, val, idx) => acc + val * Math.pow(60, parts.length - idx - 1), 0);
        playerRef.current?.seekToTime(seconds);
    };

    if (loading) return <LoadingSection message="데이터를 불러오고 있습니다..." />;
    if (error || !data) return <div className="text-center mt-10 text-gray-500">영상을 불러올 수 없습니다.</div>;

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
        <div className="flex flex-col w-full items-center max-w-[1000px] m-auto gap-5 ">
            {analysis.isWarning && <WarningBanner />}
            <VideoInfo data={data} onPlayerReady={(ref) => (playerRef.current = ref)} />
            <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-10 gap-10">
                <div className="col-auto flex flex-col gap-10">
                    <SectionLayout header="AI 전체 요약">
                        <AISummary summary={summary} />
                    </SectionLayout>
                    <SectionLayout header="좋아요 Top 5">
                        <CommentList comments={topComments} />
                    </SectionLayout>
                    <SectionLayout header="전체 댓글 확인하기" type="search-comment">
                        <SentimentBar ratio={sentimentDistribution} />
                        <CommentList comments={comments} />
                    </SectionLayout>
                </div>
                <div className="col-auto flex flex-col gap-10">
                    <SectionLayout header="언어 비율">
                        <LanguageChart data={languageDistribution} />
                    </SectionLayout>
                    <SectionLayout header="가장 많이 언급한 시간대">
                        <TagList tags={popularTimestamps.map(t => t.time)} onTagClick={handleSeek} />
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
