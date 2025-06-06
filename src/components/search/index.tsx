'use client';

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import SearchChannelResultItem from "@components/search/SearchChannelResultItem";
import {ChannelSearchResult} from "@/types/channel";
import {mockChannelSearchResponse} from "@mock/channel-mock";

export default function Search() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [channels, setChannels] = useState<ChannelSearchResult[] | null>(null);

    useEffect(() => {
        if (query) {
            setChannels(mockChannelSearchResponse.data.results);
        }
    }, [query]);

    return (
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">‘{query}’ 검색 결과</h2>
            <div className="flex flex-col w-full gap-5">
                {channels?.length ? (
                    channels.map((channel) =>
                        <SearchChannelResultItem key={channel.id} channel={channel}/>)
                ) : (
                    <p className="text-gray-500">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
}