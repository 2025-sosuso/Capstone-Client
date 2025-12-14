'use client';

import {useSearchParams, useRouter} from "next/navigation";
import {useEffect} from "react";
import SearchTabs from "@/app/search/_components/Tabs/SearchTabs";
import AllTab from "@/app/search/_components/Tabs/AllTab";
import VideoTab from "@/app/search/_components/Tabs/VideoTab";
import ShortsTab from "@/app/search/_components/Tabs/ShortsTab";
import ChannelTab from "@/app/search/_components/Tabs/ChannelTab";
import CompareActions from "@/app/search/_components/CompareActions";
import {useSearchQuery} from "@/hooks/useSearchQuery";
import {extractYoutubeVideoId} from "@/utils/youtube";

type TabType = 'all' | 'video' | 'shorts' | 'channel';

export default function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const activeTab = (searchParams.get("tab") as TabType) || 'all';

    useEffect(() => {
        if (!query) return;

        const videoId = extractYoutubeVideoId(query);
        if (videoId) {
            router.replace(`/videos/${videoId}`);
        }
    }, [query, router]);

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
            <div className="mb-6">
                <h2 className="text-2xl font-bold">&apos;{query}&apos; 검색 결과</h2>
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

            {showCompareMode && <CompareActions/>}
        </div>
    );
}