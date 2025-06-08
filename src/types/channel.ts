import { BaseApiResponse } from "./common";

export type ChannelSearchResponse = BaseApiResponse<{
    searchType: string;
    results: ChannelSearchResult[];
}>;

export interface ChannelSearchResult {
    id: string;
    title: string;
    handle: string;
    description: string;
    thumbnailUrl: string;
    subscriberCount: number;
    isFavorited: boolean;
}