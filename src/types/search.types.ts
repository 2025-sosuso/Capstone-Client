import {VideoSummaryItem} from "@/types/video-preview.types";

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