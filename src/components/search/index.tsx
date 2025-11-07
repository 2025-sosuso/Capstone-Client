'use client';

import { useSearchParams } from "next/navigation";
import SearchTabs from "@components/search/tabs/SearchTabs";
import AllTab from "@components/search/tabs/AllTab";
import VideoTab from "@components/search/tabs/VideoTab";
import ShortsTab from "@components/search/tabs/ShortsTab";
import ChannelTab from "@components/search/tabs/ChannelTab";
import LoadingSection from "@components/common/LoadingSection";
import { useSearchQuery } from "@/hooks/useSearchQuery";

type TabType = 'all' | 'video' | 'shorts' | 'channel';

export default function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const activeTab = (searchParams.get("tab") as TabType) || 'all';

    const { channels, videos, shorts, searchType, loading } = useSearchQuery(query, activeTab);

    if (searchType === "URL") {
        return (
            <div className="max-w-screen-xl mx-auto px-4 py-20 text-center">
                <LoadingSection message="영상 페이지로 이동 중..." />
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">&apos;{query}&apos; 검색 결과</h2>

            <SearchTabs />

            {activeTab === 'all' && (
                <AllTab
                    query={query || ''}
                    channels={channels}
                    videos={videos}
                    shorts={shorts}
                    loading={loading}
                />
            )}

            {activeTab === 'video' && (
                <VideoTab videos={videos} loading={loading.videos} />
            )}

            {activeTab === 'shorts' && (
                <ShortsTab shorts={shorts} loading={loading.shorts} />
            )}

            {activeTab === 'channel' && (
                <ChannelTab channels={channels} loading={loading.channels} />
            )}
        </div>
    );
}