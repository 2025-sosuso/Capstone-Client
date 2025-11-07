import VideoPreview from "@components/common/video-preview/VideoPreview";
import LoadingSection from "@components/common/LoadingSection";
import type { VideoSummaryItem } from "@/types/video-preview.types";

interface Props {
    videos: VideoSummaryItem[];
    loading: boolean;
}

export default function VideoTab({ videos, loading }: Props) {
    if (loading) {
        return <LoadingSection message="동영상 검색 중..." />;
    }

    if (videos.length === 0) {
        return <p className="text-gray-500">검색 결과가 없습니다.</p>;
    }

    return (
        <div className="flex flex-col w-full gap-5">
            {videos.map((video) => (
                <VideoPreview key={video.video.id} data={video} />
            ))}
        </div>
    );
}