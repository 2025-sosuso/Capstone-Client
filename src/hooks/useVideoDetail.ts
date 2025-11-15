import {useState, useEffect, useCallback, useRef} from "react";
import type {Comment, VideoBasicInfo, VideoAnalysisInfo, VideoAIAnalysis} from "@/types";
import type {YouTubePlayerRef} from "@components/videos/video-info/YoutubePlayer";
import type {
    VideoDetailLoadingState,
    UseVideoDetailReturn,
    VideoDetailActions
} from "@/types/video-detail.types";
import {fetchVideoBasic, fetchVideoAnalysis, fetchVideoComments, fetchVideoAI} from "@/services/video.service";
import {fetchFilteredComments} from "@/services/search.service";
import {isAIAnalysisComplete} from "@/utils/ai-analysis";
import {POLLING_CONFIG} from "@/config/polling";

const MAX_RETRIES = POLLING_CONFIG.processing.maxRetries;
const RETRY_INTERVAL = POLLING_CONFIG.processing.interval;
const AI_POLLING_INTERVAL = POLLING_CONFIG.detail.interval;
const AI_MAX_RETRIES = POLLING_CONFIG.detail.maxRetries;

// 폴링 실패 시 기본값 (분석 완료했지만 결과 없음)
const EMPTY_AI_ANALYSIS: VideoAIAnalysis = {
    summary: null,
    isWarning: false,
    languageDistribution: [],
    sentimentDistribution: { positive: 0, negative: 0, other: 0 },
    keywords: []
};

export function useVideoDetail(videoId: string): UseVideoDetailReturn {
    const [basicInfo, setBasicInfo] = useState<VideoBasicInfo | null>(null);
    const [analysisInfo, setAnalysisInfo] = useState<VideoAnalysisInfo | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [aiAnalysis, setAIAnalysis] = useState<VideoAIAnalysis | null>(null);

    const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
    const [keywordComments, setKeywordComments] = useState<Comment[]>([]);
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<VideoDetailLoadingState>({
        basic: true,
        analysis: true,
        comments: true,
        ai: true,
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [aiPollingCount, setAiPollingCount] = useState(0);
    const [error, setError] = useState(false);
    const playerRef = useRef<YouTubePlayerRef | null>(null);

    // 기본 정보 로딩
    useEffect(() => {
        let mounted = true;
        let timeoutId: number;
        let currentRetry = 0;

        const fetchBasicWithRetry = async () => {
            try {
                const result = await fetchVideoBasic(videoId);
                if (!mounted) return;

                setBasicInfo(result);
                setIsProcessing(false);
                setRetryCount(0);

            } catch (err: unknown) {
                if (!mounted) return;

                const error = err as { status?: number; message?: string };

                if (error.status === 404 || error.message?.includes('404')) {
                    if (currentRetry < MAX_RETRIES) {
                        setIsProcessing(true);
                        currentRetry++;
                        setRetryCount(currentRetry);
                        timeoutId = window.setTimeout(fetchBasicWithRetry, RETRY_INTERVAL);
                    } else {
                        console.error('[기본 정보] 최대 재시도 횟수 초과');
                        setError(true);
                        setIsProcessing(false);
                    }
                } else {
                    console.error('[기본 정보] 에러:', error);
                    setError(true);
                    setIsProcessing(false);
                }
            } finally {
                if (mounted) {
                    setIsLoading((prev) => ({...prev, basic: false}));
                }
            }
        };

        fetchBasicWithRetry();

        return () => {
            mounted = false;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [videoId]);

    // 병렬 데이터 로딩
    useEffect(() => {
        if (!basicInfo) return;
        let mounted = true;

        Promise.all([
            fetchVideoAnalysis(videoId).catch(() => null),
            fetchVideoComments(videoId).catch(() => []),
            fetchVideoAI(videoId).catch(() => null)
        ]).then(([analysis, commentsList, ai]) => {
            if (!mounted) return;

            console.log(`[${videoId}] 로딩된 데이터:`, {analysis, commentsList, ai});

            if (analysis) setAnalysisInfo(analysis);
            if (commentsList && commentsList.length > 0) {
                setComments(commentsList);
                setFilteredComments(commentsList);
                setKeywordComments(commentsList);
            }
            if (ai) setAIAnalysis(ai);

            setIsLoading({
                basic: false,
                analysis: !analysis,
                comments: !commentsList || commentsList.length === 0,
                ai: !isAIAnalysisComplete(ai),
            });

            if (!isAIAnalysisComplete(ai)) {
                setAiPollingCount(0);
            }
        });

        return () => {
            mounted = false;
        };
    }, [videoId, basicInfo]);

    // AI 폴링
    useEffect(() => {
        if (!isLoading.ai) return;
        if (aiPollingCount >= AI_MAX_RETRIES) {
            console.warn(`⏱️ [AI 폴링 종료] ${videoId} - 최대 ${AI_MAX_RETRIES}회 도달`);
            setAIAnalysis(EMPTY_AI_ANALYSIS);
            setIsLoading(prev => ({...prev, ai: false}));
            return;
        }

        let mounted = true;
        const nextRetry = aiPollingCount + 1;
        const timeoutId = window.setTimeout(async () => {
            try {
                console.log(`🔄 [AI 폴링] ${videoId} - ${nextRetry}/${AI_MAX_RETRIES}회 시도 중...`);
                const ai = await fetchVideoAI(videoId);

                if (!mounted) return;

                if (isAIAnalysisComplete(ai)) {
                    console.log(`✅ [AI 폴링 성공] ${videoId} - ${nextRetry}회 시도만에 완료`);
                    setAIAnalysis(ai);
                    setIsLoading(prev => ({...prev, ai: false}));
                } else {
                    setAiPollingCount(nextRetry);
                }
            } catch (err) {
                console.error(`❌ [AI 폴링 에러] ${videoId} - ${nextRetry}회:`, err);
                if (mounted) {
                    setAiPollingCount(nextRetry);
                }
            }
        }, AI_POLLING_INTERVAL);

        return () => {
            mounted = false;
            clearTimeout(timeoutId);
        };
    }, [videoId, isLoading.ai, aiPollingCount]);

    const handleSeek = useCallback<VideoDetailActions['handleSeek']>((timeString) => {
        const parts = timeString.split(":").map(Number);
        const seconds = parts.reduce((acc, val, idx) => acc + val * Math.pow(60, parts.length - idx - 1), 0);
        playerRef.current?.seekToTime(seconds);
    }, []);

    const handleFilterComments = useCallback<VideoDetailActions['handleFilterComments']>(async (filter) => {
        try {
            const results = await fetchFilteredComments({videoId, ...filter});
            setFilteredComments(results);
        } catch (err) {
            console.error("댓글 필터링 실패:", err);
        }
    }, [videoId]);

    const handleKeywordFilter = useCallback<VideoDetailActions['handleKeywordFilter']>(async (keyword) => {
        try {
            setSelectedKeyword(keyword);
            const results = await fetchFilteredComments({videoId, keyword});
            setKeywordComments(results);
        } catch (err) {
            console.error("키워드 댓글 필터링 실패:", err);
        }
    }, [videoId]);

    const handleSearch = useCallback<VideoDetailActions['handleSearch']>(async (q) => {
        await handleFilterComments({q});
    }, [handleFilterComments]);

    useEffect(() => {
        if (!isLoading.ai && Array.isArray(aiAnalysis?.keywords) && aiAnalysis.keywords.length > 0) {
            const firstKeyword = aiAnalysis.keywords[0];
            setSelectedKeyword(firstKeyword);
            void handleKeywordFilter(firstKeyword);
        }
    }, [isLoading.ai, aiAnalysis, handleKeywordFilter]);

    return {
        data: {
            basicInfo,
            analysisInfo,
            comments,
            aiAnalysis,
        },
        filtered: {
            comments: filteredComments,
            keywordComments,
            selectedKeyword,
        },
        state: {
            isLoading,
            isProcessing,
            retryCount,
            error,
        },
        actions: {
            handleSeek,
            handleFilterComments,
            handleKeywordFilter,
            handleSearch,
        },
        playerRef,
    };
}