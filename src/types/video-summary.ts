import {Channel, Comment, SentimentRatio, VideoDetail} from "./video";

export interface VideoSummaryResponse {
    timestamp: number;
    message: string;
    data: {
        video: Pick<VideoDetail, 'id' | 'title' | 'description' | 'publishedAt' | 'thumbnailUrl' | 'viewCount' | 'likeCount' | 'commentCount'> & {
            isScrapped: boolean;
        };
        channel: Pick<Channel, 'id' | 'title' | 'thumbnailUrl' | 'subscriberCount' | 'isFavorite'>;
        analysis: SummaryAnalysis;
    };
}

export interface SummaryAnalysis {
    summary: string;
    sentimentDistribution: SentimentRatio;
    keywords: string[];
    topComments?: Comment[];
}
