import {useState, useEffect, useMemo} from 'react';
import {VideoSummaryItem, AnalysisSummaryOnly} from '@/types/video-preview.types';
import {isAIAnalysisComplete} from '@/utils/ai-analysis';
import {fetchVideoAIPreview} from '@/services/video.service';
import {POLLING_CONFIG} from '@/config/polling';

const {
    interval: AI_POLLING_INTERVAL,
    maxRetries: AI_MAX_RETRIES,
    maxConcurrent: MAX_CONCURRENT_POLLING,
    initialDelay: AI_INITIAL_DELAY
} = POLLING_CONFIG.list;

interface PollingState {
    [videoId: string]: number;
}

// 폴링 실패 시 기본값 (분석 완료했지만 결과 없음)
const EMPTY_ANALYSIS: AnalysisSummaryOnly = {
    summary: null,
    sentimentDistribution: {positive: 0, negative: 0, other: 0},
    keywords: []
};

export function useAIPolling(
    videos: VideoSummaryItem[],
    onUpdate: (videoId: string, analysis: AnalysisSummaryOnly) => void
) {
    const [pollingState, setPollingState] = useState<PollingState>({});

    const needsPolling = useMemo(() => {
        const filtered = videos.filter(
            (video) =>
                !isAIAnalysisComplete(video.analysis) &&
                (pollingState[video.video.id] ?? 0) < AI_MAX_RETRIES
        );
        return filtered.slice(0, MAX_CONCURRENT_POLLING);
    }, [videos, pollingState]);

    useEffect(() => {
        if (needsPolling.length === 0) return;

        let mounted = true;

        const currentMaxRetry = Math.max(...needsPolling.map(v => pollingState[v.video.id] ?? 0));
        const delay = currentMaxRetry === 0 ? AI_INITIAL_DELAY : AI_POLLING_INTERVAL;

        const timeoutId = window.setTimeout(async () => {
            console.log(`[AI 폴링] ${needsPolling.length}개 영상 확인 중... (${delay}ms 대기 후)`);

            const promises = needsPolling.map(async (video) => {
                const currentRetry = pollingState[video.video.id] ?? 0;
                const nextRetry = currentRetry + 1;
                const isLastRetry = nextRetry >= AI_MAX_RETRIES;

                try {
                    const ai = await fetchVideoAIPreview(video.video.id);

                    if (!mounted) return;

                    if (isAIAnalysisComplete(ai)) {
                        console.log(`✅ [AI 폴링 성공] ${video.video.id} - ${nextRetry}회 시도만에 완료`);
                        onUpdate(video.video.id, ai);
                    } else {
                        if (isLastRetry) {
                            console.warn(`⏱️ [AI 폴링 종료] ${video.video.id} - 최대 ${AI_MAX_RETRIES}회 도달, 데이터 없음`);
                            onUpdate(video.video.id, EMPTY_ANALYSIS);
                        } else {
                            console.log(`🔄 [AI 폴링 중] ${video.video.id} - ${nextRetry}/${AI_MAX_RETRIES}회`);
                        }

                        setPollingState((prev) => ({
                            ...prev,
                            [video.video.id]: nextRetry,
                        }));
                    }
                } catch (err) {
                    console.error(`❌ [AI 폴링 에러] ${video.video.id} - ${nextRetry}회:`, err);

                    if (mounted) {
                        if (isLastRetry) {
                            console.warn(`⏱️ [AI 폴링 종료] ${video.video.id} - 에러로 인한 종료`);
                            onUpdate(video.video.id, EMPTY_ANALYSIS);
                        }

                        setPollingState((prev) => ({
                            ...prev,
                            [video.video.id]: nextRetry,
                        }));
                    }
                }
            });

            await Promise.all(promises);
        }, delay);

        return () => {
            mounted = false;
            clearTimeout(timeoutId);
        };
    }, [needsPolling, onUpdate, pollingState]);

    useEffect(() => {
        setPollingState({});
    }, [videos.length]);

    return {pollingState};
}