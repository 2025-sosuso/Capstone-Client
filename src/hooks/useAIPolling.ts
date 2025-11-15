import { useState, useEffect, useMemo } from 'react';
import { VideoSummaryItem, AnalysisSummaryOnly } from '@/types/video-preview.types';
import { isAIAnalysisComplete } from '@/utils/ai-analysis';
import { fetchVideoAISummary } from '@/services/video.service';

const AI_POLLING_INTERVAL = 5000;
const AI_MAX_RETRIES = 4;

interface PollingState {
    [videoId: string]: number;
}

export function useAIPolling(
    videos: VideoSummaryItem[],
    onUpdate: (videoId: string, analysis: AnalysisSummaryOnly) => void
) {
    const [pollingState, setPollingState] = useState<PollingState>({});

    const needsPolling = useMemo(() =>
            videos.filter(
                (video) =>
                    !isAIAnalysisComplete(video.analysis) &&
                    (pollingState[video.video.id] ?? 0) < AI_MAX_RETRIES
            ),
        [videos, pollingState]
    );

    useEffect(() => {
        if (needsPolling.length === 0) return;

        let mounted = true;
        const timeoutId = window.setTimeout(async () => {
            console.log(`[AI 폴링] ${needsPolling.length}개 영상 확인 중...`);

            const promises = needsPolling.map(async (video) => {
                try {
                    const ai = await fetchVideoAISummary(video.video.id);

                    if (!mounted) return;

                    if (isAIAnalysisComplete(ai)) {
                        console.log(`[AI 폴링] ${video.video.id} 완료!`);
                        onUpdate(video.video.id, ai);
                    } else {
                        console.log(`[AI 폴링] ${video.video.id} 아직 분석 중...`);
                        setPollingState((prev) => ({
                            ...prev,
                            [video.video.id]: (prev[video.video.id] ?? 0) + 1,
                        }));
                    }
                } catch (err) {
                    console.error(`[AI 폴링] ${video.video.id} 에러:`, err);
                    if (mounted) {
                        setPollingState((prev) => ({
                            ...prev,
                            [video.video.id]: (prev[video.video.id] ?? 0) + 1,
                        }));
                    }
                }
            });

            await Promise.all(promises);
        }, AI_POLLING_INTERVAL);

        return () => {
            mounted = false;
            clearTimeout(timeoutId);
        };
    }, [needsPolling, onUpdate]);

    // videos 변경 시 폴링 상태 초기화
    useEffect(() => {
        setPollingState({});
    }, [videos.length]);

    return { pollingState };
}