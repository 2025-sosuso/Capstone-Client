'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { searchByQuery } from "@/service/searchService";
import SearchChannelResultItem from "@components/search/SearchChannelResultItem";
import { ChannelSearchResult } from "@/types/channel";
import LoadingSection from "@components/common/LoadingSection";

export default function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const router = useRouter();

    const [channels, setChannels] = useState<ChannelSearchResult[] | null>(null);
    const [searchType, setSearchType] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await searchByQuery(query);
                console.log(result);
                setSearchType(result.searchType);

                if (result.searchType === "URL") {
                    const videoId = result.results[0]?.video.id;
                    console.log("이동할 videoId:", videoId);
                    if (videoId) {
                        router.replace(`/videos/${videoId}`);
                    }
                } else if (result.searchType === "CHANNEL") {
                    setChannels(result.results);
                }

            } catch (e) {
                console.error("검색 실패:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query, router]);

    if (searchType === "URL") return null;
    if(loading) return <LoadingSection message="검색 중입니다..." />;

    return (
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">&apos;{query}&apos; 검색 결과</h2>
            <div className="flex flex-col w-full gap-5">
                {channels?.length ? (
                    channels.map((channel) => (
                        <SearchChannelResultItem key={channel.id} channel={channel} />
                    ))
                ) : (
                    <p className="text-gray-500">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
}