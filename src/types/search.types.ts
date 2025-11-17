import {VideoSummaryItem} from "@/types/video-preview.types";
import {BaseApiResponse} from "@/types/common.types";

export interface VideoSearchResponse {
    results: VideoSummaryItem[];
    nextPageToken: string | null;
    totalResults: number;
    hasMore: boolean;
}

export interface ShortsSearchResponse {
    results: VideoSummaryItem[];
    nextPageToken: string | null;
    totalResults: number;
    hasMore: boolean;
}

export type SearchStatus = "up" | "down" | "same";

export interface TrendingSearchItem {
    rank: number;
    keyword: string;
    status: SearchStatus;
}

export interface TrendingSearch {
    updateAt: string;
    items: TrendingSearchItem[];
}

export type TrendingSearchResponse = BaseApiResponse<TrendingSearch[]>;