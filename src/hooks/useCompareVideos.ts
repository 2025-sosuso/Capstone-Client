import {useState, useEffect, useMemo, useCallback} from "react";
import type {VideoResult, VideoAIAnalysis} from "@/types";
import {fetchVideoBasic, fetchVideoAnalysis, fetchVideoAI} from "@/services/video.service";
import {isAIAnalysisComplete} from "@/utils/ai-analysis";
import {POLLING_CONFIG} from "@/config/polling";

const {
    initialDelay: AI_INITIAL_DELAY,
    interval: AI_POLLING_INTERVAL,
    maxRetries: AI_MAX_RETRIES,
} = POLLING_CONFIG.list;

export function useCompareVideos(ids: string[]) {
    const [data, setData] = useState<(VideoResult | null)[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pollingState, setPollingState] = useState<Record<string, number>>({});

    const idsKey = useMemo(() => ids.join(","), [ids]);

    useEffect(() => {
        if (ids.length === 0) {
            setIsLoading(false);
            return;
        }

        let mounted = true;

        const loadAll = async () => {
            setIsLoading(true);
            setPollingState({});

            const results = await Promise.all(
                ids.map(async (id) => {
                    try {
                        const [basic, analysis, ai] = await Promise.all([
                            fetchVideoBasic(id),
                            fetchVideoAnalysis(id).catch(() => null),
                            fetchVideoAI(id).catch(() => null),
                        ]);

                        return {
                            video: basic.video,
                            channel: basic.channel,
                            analysis: {
                                summary: ai?.summary ?? '',
                                isWarning: ai?.isWarning ?? false,
                                topComments: analysis?.topComments ?? [],
                                languageDistribution: ai?.languageDistribution ?? [],
                                sentimentDistribution: ai?.sentimentDistribution ?? {
                                    positive: 0,
                                    negative: 0,
                                    other: 0
                                },
                                popularTimestamps: analysis?.popularTimestamps ?? [],
                                commentHistogram: analysis?.commentHistogram ?? [],
                                keywords: ai?.keywords ?? [],
                            },
                            comments: [],
                        } as VideoResult;
                    } catch (err) {
                        console.error(`[Compare] ${id} 로딩 실패:`, err);
                        return null;
                    }
                })
            );

            if (mounted) {
                setData(results);
                setIsLoading(false);
            }
        };

        loadAll();

        return () => {
            mounted = false;
        };
    }, [idsKey, ids.length]);

    const needsPolling = useMemo(() => {
        return data
            .map((video, idx) => ({video, id: ids[idx]}))
            .filter(({video, id}) =>
                video !== null &&
                !isAIAnalysisComplete(video.analysis) &&
                (pollingState[id] ?? 0) < AI_MAX_RETRIES
            );
    }, [data, ids, pollingState]);

    const updateAI = useCallback((videoId: string, ai: VideoAIAnalysis) => {
        setData(prev => prev.map((video, idx) => {
            if (ids[idx] !== videoId || !video) return video;
            return {
                ...video,
                analysis: {
                    ...video.analysis,
                    summary: ai.summary ?? '',
                    isWarning: ai.isWarning,
                    languageDistribution: ai.languageDistribution,
                    sentimentDistribution: ai.sentimentDistribution,
                    keywords: ai.keywords,
                },
            };
        }));
    }, [ids]);

    useEffect(() => {
        if (isLoading || needsPolling.length === 0) return;

        let mounted = true;

        const currentMaxRetry = Math.max(...needsPolling.map(({id}) => pollingState[id] ?? 0));
        const delay = currentMaxRetry === 0 ? AI_INITIAL_DELAY : AI_POLLING_INTERVAL;

        const timeoutId = window.setTimeout(async () => {
            console.log(`[Compare AI 폴링] ${needsPolling.length}개 영상 확인 중...`);

            await Promise.all(
                needsPolling.map(async ({id}) => {
                    const currentRetry = pollingState[id] ?? 0;
                    const nextRetry = currentRetry + 1;
                    const isLastRetry = nextRetry >= AI_MAX_RETRIES;

                    try {
                        const ai = await fetchVideoAI(id);
                        if (!mounted) return;

                        if (isAIAnalysisComplete(ai)) {
                            console.log(`✅ [Compare AI 성공] ${id}`);
                            updateAI(id, ai);
                        } else if (isLastRetry) {
                            console.warn(`⏱️ [Compare AI 종료] ${id} - 최대 횟수 도달`);
                            updateAI(id, ai);
                        }

                        setPollingState(prev => ({...prev, [id]: nextRetry}));
                    } catch (err) {
                        console.error(`❌ [Compare AI 에러] ${id}:`, err);
                        if (mounted) {
                            setPollingState(prev => ({...prev, [id]: nextRetry}));
                        }
                    }
                })
            );
        }, delay);

        return () => {
            mounted = false;
            clearTimeout(timeoutId);
        };
    }, [isLoading, needsPolling, pollingState, updateAI]);

    return {data, isLoading};
}