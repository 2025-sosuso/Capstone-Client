import ChannelItem from "@components/search/ChannelItem";
import LoadingSection from "@components/common/LoadingSection";
import type { ChannelSearchResult } from "@/types";

interface Props {
    channels: ChannelSearchResult[] | null;
    loading: boolean;
}

export default function ChannelTab({ channels, loading }: Props) {
    if (loading) {
        return <LoadingSection message="채널 검색 중..." />;
    }

    if (!channels || channels.length === 0) {
        return <p className="text-gray-500">검색 결과가 없습니다.</p>;
    }

    return (
        <div className="flex flex-col gap-5">
            {channels.map((channel) => (
                <ChannelItem key={channel.id} channel={channel} />
            ))}
        </div>
    );
}