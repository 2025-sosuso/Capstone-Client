import { VideoAIAnalysis } from '@/types/video.types';
import { SummaryAnalysis } from '@/types/video-preview.types';

/**
 * AI 분석이 완료되었는지 판단
 * summary 또는 keywords가 존재하면 완료로 간주
 */
export function isAIAnalysisComplete(
    aiAnalysis: VideoAIAnalysis | SummaryAnalysis | null
): boolean {
    if (!aiAnalysis) return false;

    const hasSummary = aiAnalysis.summary !== null && aiAnalysis.summary !== '';
    const hasKeywords = Array.isArray(aiAnalysis.keywords) && aiAnalysis.keywords.length > 0;

    return hasSummary || hasKeywords;
}