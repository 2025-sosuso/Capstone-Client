import {useState, useEffect, useCallback, useRef} from "react";
import type {Comment, VideoBasicInfo, VideoAnalysisInfo, VideoAIAnalysis} from "@/types/video.types";
import type {YouTubePlayerRef} from "@components/videos/video-info/YoutubePlayer";
import {fetchVideoBasic, fetchVideoAnalysis, fetchVideoComments, fetchVideoAI} from "@/services/video.service";
import {fetchFilteredComments} from "@/services/search.service";

export function useVideoDetail(videoId: string) {
    // 각 섹션별 독립적인 상태 관리
    const [basicInfo, setBasicInfo] = useState<VideoBasicInfo | null>(null);
    const [analysisInfo, setAnalysisInfo] = useState<VideoAnalysisInfo | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [aiAnalysis, setAIAnalysis] = useState<VideoAIAnalysis | null>(null);

    const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
    const [keywordComments, setKeywordComments] = useState<Comment[]>([]);
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

    // 각 섹션별 로딩 상태
    const [isLoading, setIsLoading] = useState({
        basic: true,
        analysis: true,
        comments: true,
        ai: true,
    });

    const [error, setError] = useState(false);
    const playerRef = useRef<YouTubePlayerRef | null>(null);

    // 데이터 fetching
    useEffect(() => {
        let mounted = true;

        fetchVideoBasic(videoId)
            .then((result) => {
                if (!mounted) return;
                setBasicInfo(result);
            })
            .catch((err) => {
                console.error("기본 정보 로딩 실패:", err);
                setError(true);
            })
            .finally(() => {
                if (!mounted) return;
                setIsLoading((prev) => ({...prev, basic: false}));
            });

        fetchVideoAnalysis(videoId)
            .then((result) => {
                if (!mounted) return;
                setAnalysisInfo(result);
            })
            .catch((err) => {
                console.error("분석 정보 로딩 실패:", err);
            })
            .finally(() => {
                if (!mounted) return;
                setIsLoading((prev) => ({...prev, analysis: false}));
            });

        fetchVideoComments(videoId)
            .then((result) => {
                if (!mounted) return;
                setComments(result);
                setFilteredComments(result);
                setKeywordComments(result);
            })
            .catch((err) => {
                console.error("댓글 로딩 실패:", err);
            })
            .finally(() => {
                if (!mounted) return;
                setIsLoading((prev) => ({...prev, comments: false}));
            });

        fetchVideoAI(videoId)
            .then((result) => {
                if (!mounted) return;
                setAIAnalysis(result);
            })
            .catch((err) => {
                console.error("AI 분석 로딩 실패:", err);
            })
            .finally(() => {
                if (!mounted) return;
                setIsLoading((prev) => ({...prev, ai: false}));
            });

        return () => {
            mounted = false;
        };
    }, [videoId]);

    // Handlers
    const handleSeek = useCallback((timeString: string) => {
        const parts = timeString.split(":").map(Number);
        const seconds = parts.reduce((acc, val, idx) => acc + val * Math.pow(60, parts.length - idx - 1), 0);
        playerRef.current?.seekToTime(seconds);
    }, []);

    const handleFilterComments = useCallback(async (filter: {
        q?: string;
        sentiment?: 'POSITIVE' | 'NEGATIVE' | 'OTHER'
    }) => {
        try {
            const results = await fetchFilteredComments({videoId, ...filter});
            setFilteredComments(results);
        } catch (err) {
            console.error("댓글 필터링 실패:", err);
        }
    }, [videoId]);

    const handleKeywordFilter = useCallback(async (keyword: string) => {
        try {
            setSelectedKeyword(keyword);
            const results = await fetchFilteredComments({videoId, keyword});
            setKeywordComments(results);
        } catch (err) {
            console.error("키워드 댓글 필터링 실패:", err);
        }
    }, [videoId]);

    const handleSearch = useCallback(async (q: string) => {
        await handleFilterComments({q});
    }, [handleFilterComments]);

    // 첫 키워드 자동 선택
    useEffect(() => {
        if (!isLoading.ai && Array.isArray(aiAnalysis?.keywords) && aiAnalysis.keywords.length > 0) {
            const firstKeyword = aiAnalysis.keywords[0];
            setSelectedKeyword(firstKeyword);
            void handleKeywordFilter(firstKeyword);
        }
    }, [isLoading.ai, aiAnalysis, handleKeywordFilter]);

    return {
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

        // Handlers
        handleSeek,
        handleFilterComments,
        handleKeywordFilter,
        handleSearch,
    };
}