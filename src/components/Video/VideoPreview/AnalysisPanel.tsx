import AnalysisItem from "@components/Video/VideoPreview/AnalysisItem";
import {FaceSmileIcon, HashtagIcon, SparklesIcon} from "@heroicons/react/24/outline";
import AISummary from "@components/Video/AISummary";
import SentimentBar from "@components/Video/SentimentBar/SentimentBar";
import TagList from "@components/Video/Tag/TagList";
import {AnalysisSummaryOnly} from "@/types/video-preview.types";
import {isAIAnalysisComplete} from "@/utils/ai-analysis";

interface Props {
    analysis: AnalysisSummaryOnly | null | undefined;
    className?: string;
}

export default function AnalysisPanel({analysis, className}: Props) {
    const isLoading = !isAIAnalysisComplete(analysis ?? null);

    const summary = analysis?.summary ?? null;
    const sentimentDistribution = analysis?.sentimentDistribution ?? {positive: 0, negative: 0, other: 0};
    const keywords = analysis?.keywords ?? [];

    return (
        <div className={`flex flex-col gap-2 ${className ?? 'w-full'}`}>
            <AnalysisItem icon={<SparklesIcon className="size-5 stroke-2"/>}>
                <AISummary summary={summary} size="sm" isLoading={isLoading} />
            </AnalysisItem>

            <AnalysisItem icon={<FaceSmileIcon className="size-5 stroke-2"/>}>
                <SentimentBar
                    ratio={sentimentDistribution}
                    size="sm"
                    isLoading={isLoading}
                />
            </AnalysisItem>

            <AnalysisItem icon={<HashtagIcon className="size-5 stroke-2"/>}>
                <TagList tags={keywords} size="sm" isLoading={isLoading} />
            </AnalysisItem>
        </div>
    );
}