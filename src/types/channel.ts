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
    favoriteChannelId?: number | null;
}

export type FavoriteChannelListResponse = BaseApiResponse<FavoriteChannel[]>;

export interface FavoriteChannel {
    favoriteChannelId: number;
    apiChannelId: string;
    apiChannelName: string;
    apiChannelThumbnail: string;
}