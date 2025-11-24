import { VideoAIAnalysis } from '@/types/video.types';
import { SummaryAnalysis } from '@/types/video-preview.types';

export function isAIAnalysisComplete(
    aiAnalysis: VideoAIAnalysis | SummaryAnalysis | null
): boolean {
    if (!aiAnalysis) return false;

    const hasSentiment = aiAnalysis.sentimentDistribution !== null &&
        (aiAnalysis.sentimentDistribution.positive > 0 ||
            aiAnalysis.sentimentDistribution.negative > 0 ||
            aiAnalysis.sentimentDistribution.other > 0);

    const hasSummary = aiAnalysis.summary !== null && aiAnalysis.summary !== '';

    const hasKeywords = Array.isArray(aiAnalysis.keywords) && aiAnalysis.keywords.length > 0;

    return hasSentiment || hasSummary || hasKeywords;
}