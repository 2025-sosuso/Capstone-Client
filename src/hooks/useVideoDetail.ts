import {useState, useEffect, useCallback, useRef} from "react";
import type {Comment, VideoBasicInfo, VideoAnalysisInfo, VideoAIAnalysis, VideoUserState} from "@/types";
import type {YouTubePlayerRef} from "@components/Videos/VideoInfo/YoutubePlayer";
import type {VideoDetailLoadingState, UseVideoDetailReturn, VideoDetailActions} from "@/types/video-detail.types";
import {fetchVideoBasic, fetchVideoAnalysis, fetchVideoComments, fetchVideoAI, fetchVideoUserState} from "@/services/video.service";
import {fetchFilteredComments} from "@/services/search.service";
import {isAIAnalysisComplete} from "@/utils/ai-analysis";
import {POLLING_CONFIG} from "@/config/polling";

const {processing, detail} = POLLING_CONFIG;

export function useVideoDetail(videoId: string): UseVideoDetailReturn {
    // 데이터 상태
    const [basicInfo, setBasicInfo] = useState<VideoBasicInfo | null>(null);
    const [userState, setUserState] = useState<VideoUserState | null>(null);
    const [analysisInfo, setAnalysisInfo] = useState<VideoAnalysisInfo | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [aiAnalysis, setAIAnalysis] = useState<VideoAIAnalysis | null>(null);

    // 필터링 상태
    const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
    const [keywordComments, setKeywordComments] = useState<Comment[]>([]);
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

    // 로딩/에러 상태
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

    // 1. 기본 정보 로드 (404 재시도 포함)
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

                // 사용자 상태 조회 (비로그인이면 실패해도 OK)
                fetchVideoUserState(videoId)
                    .then((res) => mounted && setUserState(res))
                    .catch(() => console.log('[사용자 상태] 조회 실패 (비로그인 상태일 수 있음)'));

            } catch (err: unknown) {
                if (!mounted) return;

                const error = err as { status?: number; message?: string };
                const is404 = error.status === 404 || error.message?.includes('404');

                if (is404 && currentRetry < processing.maxRetries) {
                    setIsProcessing(true);
                    currentRetry++;
                    setRetryCount(currentRetry);

                    const delay = currentRetry === 1 ? processing.initialDelay : processing.interval;
                    console.log(`[기본 정보] ${currentRetry}회 재시도 예정 (${delay}ms 후)`);
                    timeoutId = window.setTimeout(fetchBasicWithRetry, delay);
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

    // 2. 분석 데이터 로드 (basicInfo 로드 후)
    useEffect(() => {
        if (!basicInfo) return;
        let mounted = true;

        Promise.all([
            fetchVideoAnalysis(videoId).catch(() => null),
            fetchVideoComments(videoId).catch(() => []),
            fetchVideoAI(videoId).catch(() => null)
        ]).then(([analysis, commentsList, ai]) => {
            if (!mounted) return;

            if (analysis) setAnalysisInfo(analysis);
            if (commentsList?.length > 0) {
                setComments(commentsList);
                setFilteredComments(commentsList);
                setKeywordComments(commentsList);
            }
            if (ai) setAIAnalysis(ai);

            setIsLoading({
                basic: false,
                analysis: !analysis,
                comments: !commentsList?.length,
                ai: !isAIAnalysisComplete(ai),
            });

            if (!isAIAnalysisComplete(ai)) {
                setAiPollingCount(0);
            }
        });

        return () => { mounted = false; };
    }, [videoId, basicInfo]);

    // 3. AI 폴링
    useEffect(() => {
        if (!isLoading.ai) return;
        if (aiPollingCount >= detail.maxRetries) {
            console.warn(`⏱️ [AI 폴링 종료] ${videoId} - 최대 ${detail.maxRetries}회 도달`);
            setIsLoading(prev => ({...prev, ai: false}));
            return;
        }

        let mounted = true;
        const nextRetry = aiPollingCount + 1;
        const delay = aiPollingCount === 0 ? detail.initialDelay : detail.interval;

        const timeoutId = window.setTimeout(async () => {
            try {
                console.log(`🔄 [AI 폴링] ${videoId} - ${nextRetry}/${detail.maxRetries}회 시도 중...`);
                const ai = await fetchVideoAI(videoId);
                if (!mounted) return;

                if (isAIAnalysisComplete(ai) || nextRetry >= detail.maxRetries) {
                    setAIAnalysis(ai);
                    setIsLoading(prev => ({...prev, ai: false}));
                } else {
                    setAiPollingCount(nextRetry);
                }
            } catch (err) {
                console.error(`❌ [AI 폴링 에러] ${videoId}:`, err);
                if (mounted) setAiPollingCount(nextRetry);
            }
        }, delay);

        return () => {
            mounted = false;
            clearTimeout(timeoutId);
        };
    }, [videoId, isLoading.ai, aiPollingCount]);

    // 4. AI 로드 완료 시 첫 번째 키워드 자동 선택
    useEffect(() => {
        if (!isLoading.ai && aiAnalysis?.keywords?.length) {
            const firstKeyword = aiAnalysis.keywords[0];
            setSelectedKeyword(firstKeyword);
            void handleKeywordFilter(firstKeyword);
        }
    }, [isLoading.ai, aiAnalysis]);

    // 액션 핸들러
    const handleSeek = useCallback<VideoDetailActions['handleSeek']>((timeString) => {
        const parts = timeString.split(":").map(Number);
        const seconds = parts.reduce((acc, val, idx) => acc + val * Math.pow(60, parts.length - idx - 1), 0);
        playerRef.current?.seekToTime(seconds);

        const videoElement = document.querySelector('iframe[src*="youtube"]');
        if (videoElement) {
            videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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

    return {
        data: {basicInfo, userState, analysisInfo, comments, aiAnalysis},
        filtered: {comments: filteredComments, keywordComments, selectedKeyword},
        state: {isLoading, isProcessing, retryCount, error},
        actions: {handleSeek, handleFilterComments, handleKeywordFilter, handleSearch},
        playerRef,
    };
}