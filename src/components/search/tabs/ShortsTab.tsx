import ShortsPreview from "@components/common/video-preview/ShortsPreview";
import LoadingSection from "@components/common/LoadingSection";
import type { VideoSummaryItem } from "@/types";

interface Props {
    shorts: VideoSummaryItem[];
    loading: boolean;
}

export default function ShortsTab({ shorts, loading }: Props) {
    if (loading) {
        return <LoadingSection message="Shorts 검색 중..." />;
    }

    if (shorts.length === 0) {
        return <p className="text-gray-500">검색 결과가 없습니다.</p>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {shorts.map((video) => (
                <ShortsPreview key={video.video.id} data={video} />
            ))}
        </div>
    );
}