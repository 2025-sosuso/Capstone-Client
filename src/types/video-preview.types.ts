import {BaseApiResponse} from "./common.types";
import {Channel, Comment, SentimentRatio, VideoDetail} from "./video.types";

export type VideoSummaryItem = {
    video: Pick<VideoDetail, 'id' | 'title' | 'description' | 'publishedAt' | 'thumbnailUrl' | 'viewCount' | 'likeCount' | 'commentCount'>;
    channel: Pick<Channel, 'id' | 'title' | 'thumbnailUrl' | 'subscriberCount'>;
    analysis: SummaryAnalysis | null;
};

export interface SummaryAnalysis {
    summary: string | null;
    sentimentDistribution: SentimentRatio;
    keywords: string[];
    topComments?: Comment[];
}

export type VideoSummaryListResponse = BaseApiResponse<VideoSummaryItem[]>;
export type VideoSummaryResponse = BaseApiResponse<VideoSummaryItem>;
export type AnalysisSummaryOnly = Omit<SummaryAnalysis, 'topComments'>;