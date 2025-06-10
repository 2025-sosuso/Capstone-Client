import { BaseApiResponse } from "./common";
import { Channel, Comment, SentimentRatio, VideoDetail } from "./video";
export type VideoSummaryItem = {
    video: Pick<VideoDetail, 'id' | 'title' | 'description' | 'publishedAt' | 'thumbnailUrl' | 'viewCount' | 'likeCount' | 'commentCount' | 'scrapId'>;
    channel: Pick<Channel, 'id' | 'title' | 'thumbnailUrl' | 'subscriberCount' | 'favoriteChannelId'>;
    analysis: SummaryAnalysis;
};

export interface SummaryAnalysis {
    summary: string;
    sentimentDistribution: SentimentRatio;
    keywords: string[];
    topComments?: Comment[];
}

export type VideoSummaryListResponse = BaseApiResponse<VideoSummaryItem[]>;
export type VideoSummaryResponse = BaseApiResponse<VideoSummaryItem>;