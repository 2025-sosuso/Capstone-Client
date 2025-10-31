import {ChannelSearchResult} from "@/types/channel.types";

type UrlSearchResponse = {
    searchType: "URL";
    results: { apiVideoId: string }[];
};

type ChannelSearchResponse = {
    searchType: "CHANNEL";
    results: ChannelSearchResult[];
};

export type SearchResponse = UrlSearchResponse | ChannelSearchResponse;
