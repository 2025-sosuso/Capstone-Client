import ChannelItem from "@components/search/ChannelItem";
import LoadingSection from "@components/common/LoadingSection";
import ErrorState from "@components/common/ErrorState";
import type {ChannelSearchResult} from "@/types";

interface Props {
    channels: ChannelSearchResult[] | null;
    loading: boolean;
}

export default function ChannelTab({channels, loading}: Props) {
    const hasSearchStarted = loading || channels !== null;

    if (!hasSearchStarted) {
        return null;
    }

    if (loading && (!channels || channels.length === 0)) {
        return <LoadingSection message="채널 검색 결과를 불러오는 중이에요..."/>;
    }

    if (!channels || channels.length === 0) {
        return <ErrorState title="검색 결과가 없습니다" emoji="🫤" description=""/>;
    }

    return (
        <div className="flex flex-col gap-5">
            {channels.map((channel) => (
                <ChannelItem key={channel.id} channel={channel}/>
            ))}
        </div>
    );
}