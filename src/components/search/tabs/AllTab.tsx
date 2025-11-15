import {useRouter} from "next/navigation";
import ChannelPreview from "@components/search/ChannelPreview";
import VideoPreview from "@components/common/video-preview/VideoPreview";
import ShortsPreview from "@components/common/video-preview/ShortsPreview";
import SearchSectionHeader from "@components/search/SearchSectionHeader";
import type {ChannelSearchResult} from "@/types/channel.types";
import type {VideoSummaryItem} from "@/types/video-preview.types";

interface Props {
    query: string;
    channels: ChannelSearchResult[] | null;
    videos: VideoSummaryItem[];
    shorts: VideoSummaryItem[];
    loading: {
        channels: boolean;
        videos: boolean;
        shorts: boolean;
    };
}

export default function AllTab({query, channels, videos, shorts, loading}: Props) {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-8">
            {channels && channels.length > 0 && (
                <section>
                    <SearchSectionHeader
                        title="채널"
                        onClick={() => router.push(`/search?q=${query}&tab=channel`)}
                    />
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {channels.slice(0, 9).map((channel) => (
                            <ChannelPreview key={channel.id} channel={channel}/>
                        ))}
                    </div>
                </section>
            )}

            {videos.length > 0 ? (
                <section>
                    <SearchSectionHeader
                        title="동영상"
                        onClick={() => router.push(`/search?q=${query}&tab=video`)}
                    />
                    <div className="flex flex-col gap-5">
                        {videos.map((video, index) => (
                            <VideoPreview key={`video-${video.video.id}-${index}`} data={video} />
                        ))}
                    </div>
                </section>
            ) : loading.videos ? (
                <div className="text-center py-6 text-gray-400">동영상 검색 중...</div>
            ) : null}

            {shorts.length > 0 ? (
                <section>
                    <SearchSectionHeader
                        title="Shorts"
                        onClick={() => router.push(`/search?q=${query}&tab=shorts`)}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {shorts.map((video, index) => (
                            <ShortsPreview key={`shorts-${video.video.id}-${index}`} data={video}/>
                        ))}
                    </div>
                </section>
            ) : loading.shorts ? (
                <div className="text-center py-6 text-gray-400">Shorts 검색 중...</div>
            ) : null}

            {!loading.videos && !loading.shorts && !loading.channels &&
                videos.length === 0 && shorts.length === 0 && (!channels || channels.length === 0) && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                    </div>
                )}
        </div>
    );
}