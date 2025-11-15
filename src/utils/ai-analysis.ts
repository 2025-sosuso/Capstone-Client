import { VideoAIAnalysis } from '@/types/video.types';
import { SummaryAnalysis } from '@/types/video-preview.types';

/**
 * AI 분석이 완료되었는지 판단
 *
 * 판단 기준:
 * - sentimentDistribution이 null이 아니면 분석 완료 (가장 확실한 지표)
 * - 또는 summary가 null이 아니면 분석 완료
 * - 또는 keywords가 1개 이상이면 분석 완료
 */
export function isAIAnalysisComplete(
    aiAnalysis: VideoAIAnalysis | SummaryAnalysis | null
): boolean {
    if (!aiAnalysis) return false;

    const hasSentiment = aiAnalysis.sentimentDistribution !== null;
    const hasSummary = aiAnalysis.summary !== null;
    const hasKeywords = Array.isArray(aiAnalysis.keywords) && aiAnalysis.keywords.length > 0;

    return hasSentiment || hasSummary || hasKeywords;
}