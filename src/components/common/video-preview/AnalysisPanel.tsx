import AnalysisItem from "@components/common/Video/AnalysisItem";
import {FaceSmileIcon, HashtagIcon, SparklesIcon} from "@heroicons/react/24/outline";
import AISummary from "@components/common/AISummary";
import SentimentBar from "@components/common/SentimentBar/SentimentBar";
import TagList from "@components/common/Tag/TagList";
import {AnalysisSummaryOnly} from "@/types/video-summary.types";

interface Props {
    analysis: AnalysisSummaryOnly;
}

export default function AnalysisPanel({ analysis }: Props) {
    const { summary, sentimentDistribution, keywords } = analysis;

    return (
        <div className="flex flex-col gap-2 w-full lg:w-[40%]">
            <AnalysisItem icon={<SparklesIcon className="size-5 stroke-2"/>}>
                <AISummary summary={summary ?? ""} size="sm"/>
            </AnalysisItem>

            <AnalysisItem icon={<FaceSmileIcon className="size-5 stroke-2"/>}>
                <SentimentBar
                    ratio={sentimentDistribution ?? {positive: 0, negative: 0, other: 0}}
                    size="sm"
                />
            </AnalysisItem>

            <AnalysisItem icon={<HashtagIcon className="size-5 stroke-2"/>}>
                <TagList tags={keywords ?? []} size="sm"/>
            </AnalysisItem>
        </div>
    );
}