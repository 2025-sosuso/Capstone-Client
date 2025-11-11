'use client';

import {useSearchParams} from "next/navigation";
import SearchTabs from "@components/search/tabs/SearchTabs";
import AllTab from "@components/search/tabs/AllTab";
import VideoTab from "@components/search/tabs/VideoTab";
import ShortsTab from "@components/search/tabs/ShortsTab";
import ChannelTab from "@components/search/tabs/ChannelTab";
import CompareActions from "@components/search/CompareActions";
import {useSearchQuery} from "@/hooks/useSearchQuery";

type TabType = 'all' | 'video' | 'shorts' | 'channel';

export default function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const activeTab = (searchParams.get("tab") as TabType) || 'all';

    const {
        channels,
        videos,
        shorts,
        loading,
        videoNextPageToken,
        videosHasMore,
        shortsNextPageToken,
        shortsHasMore,
    } = useSearchQuery(query, activeTab);

    const showCompareMode = activeTab !== 'channel';

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">&apos;{query}&apos; 검색 결과</h2>
                {showCompareMode && <CompareActions />}
            </div>

            <SearchTabs/>

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
                <VideoTab
                    videos={videos}
                    loading={loading.videos}
                    initialNextPageToken={videoNextPageToken}
                    initialHasMore={videosHasMore}
                />
            )}

            {activeTab === 'shorts' && (
                <ShortsTab
                    shorts={shorts}
                    loading={loading.shorts}
                    initialNextPageToken={shortsNextPageToken}
                    initialHasMore={shortsHasMore}
                />
            )}

            {activeTab === 'channel' && (
                <ChannelTab channels={channels} loading={loading.channels}/>
            )}
        </div>
    );
}