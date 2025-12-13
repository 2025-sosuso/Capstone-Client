import {useRouter} from "next/navigation";
import ChannelPreview from "@components/Search/ChannelPreview";
import VideoPreview from "@components/Common/VideoPreview/VideoPreview";
import ShortsPreview from "@components/Common/VideoPreview/ShortsPreview";
import SearchSectionHeader from "@components/Search/SearchSectionHeader";
import type {ChannelSearchResult} from "@/types/channel.types";
import type {VideoSummaryItem} from "@/types/video-preview.types";
import LoadingSection from "@components/Common/LoadingSection";
import ErrorState from "@components/Common/ErrorState";

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

function EmptyMessage({text}: { text: string }) {
    return <p className="text-gray-400 text-sm py-4">{text}</p>;
}

export default function AllTab({query, channels, videos, shorts, loading}: Props) {
    const router = useRouter();

    const hasAnyResults = (channels && channels.length > 0) || videos.length > 0 || shorts.length > 0;
    const isAnyLoading = loading.channels || loading.videos || loading.shorts;
    const hasSearchStarted = isAnyLoading || channels !== null || videos.length > 0 || shorts.length > 0;

    if (!hasSearchStarted) return null;

    if (isAnyLoading && !hasAnyResults) {
        return <LoadingSection message="검색 결과를 불러오는 중이에요..."/>;
    }

    return (
        <div className="flex flex-col gap-8">
            <section>
                <SearchSectionHeader
                    title="채널"
                    onClick={() => router.push(`/search?q=${query}&tab=channel`)}
                />
                {loading.channels ? (
                    <LoadingSection message="채널 검색 결과를 불러오는 중이에요..."/>
                ) : channels && channels.length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {channels.slice(0, 9).map((channel) => (
                            <ChannelPreview key={channel.id} channel={channel}/>
                        ))}
                    </div>
                ) : (
                    <EmptyMessage text="채널 검색 결과가 없습니다."/>
                )}
            </section>

            <section>
                <SearchSectionHeader
                    title="동영상"
                    onClick={() => router.push(`/search?q=${query}&tab=video`)}
                />
                {loading.videos ? (
                    <LoadingSection message="동영상 검색 결과를 불러오는 중이에요..."/>
                ) : videos.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        {videos.map((video, index) => (
                            <VideoPreview key={`video-${video.video.id}-${index}`} data={video}/>
                        ))}
                    </div>
                ) : (
                    <EmptyMessage text="동영상 검색 결과가 없습니다."/>
                )}
            </section>

            <section>
                <SearchSectionHeader
                    title="Shorts"
                    onClick={() => router.push(`/search?q=${query}&tab=shorts`)}
                />
                {loading.shorts ? (
                    <LoadingSection message="Shorts 검색 결과를 불러오는 중이에요..."/>
                ) : shorts.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {shorts.map((video, index) => (
                            <ShortsPreview key={`shorts-${video.video.id}-${index}`} data={video}/>
                        ))}
                    </div>
                ) : (
                    <EmptyMessage text="Shorts 검색 결과가 없습니다."/>
                )}
            </section>

            {!loading.channels && !loading.videos && !loading.shorts && !hasAnyResults && (
                <ErrorState title="검색 결과가 없습니다" emoji="🫤" description=""/>
            )}
        </div>
    );
}