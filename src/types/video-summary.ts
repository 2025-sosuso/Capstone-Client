import { BaseApiResponse } from "./common";
import { Channel, Comment, SentimentRatio, VideoDetail } from "./video";

export type VideoSummaryResponse = BaseApiResponse<{
    video: Pick<VideoDetail, 'id' | 'title' | 'description' | 'publishedAt' | 'thumbnailUrl' | 'viewCount' | 'likeCount' | 'commentCount'> & {
        isScrapped: boolean;
    };
    channel: Pick<Channel, 'id' | 'title' | 'thumbnailUrl' | 'subscriberCount' | 'isFavorite'>;
    analysis: SummaryAnalysis;
}>;

export interface SummaryAnalysis {
    summary: string;
    sentimentDistribution: SentimentRatio;
    keywords: string[];
    topComments?: Comment[];
}