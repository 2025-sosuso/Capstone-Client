export interface ChannelSearchResponse {
    timestamp: string;
    message: string;
    data: {
        searchType: string;
        results: ChannelSearchResult[];
    }
}

export interface ChannelSearchResult {
    id: string;
    title: string;
    handle: string;
    description: string;
    thumbnailUrl: string;
    subscriberCount: number;
    isFavorited: boolean;
}
