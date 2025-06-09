import {ChannelSearchResult} from "@/types/channel";

type UrlSearchResponse = {
    searchType: "URL";
    results: { apiVideoId: string }[];
};

type ChannelSearchResponse = {
    searchType: "CHANNEL";
    results: ChannelSearchResult[];
};

export type SearchResponse = UrlSearchResponse | ChannelSearchResponse;
