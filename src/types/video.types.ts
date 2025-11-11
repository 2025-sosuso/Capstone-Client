import {BaseApiResponse} from "./common.types";

export interface VideoResult {
    video: VideoDetail;
    channel: Channel;
    analysis: VideoAnalysis;
    comments: Comment[];
}

export interface VideoDetail {
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnailUrl: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    scrapId?: number | null;
}

export interface Channel {
    id: string;
    title: string;
    thumbnailUrl: string;
    subscriberCount: number;
    favoriteChannelId?: number | null;
}

export interface VideoAnalysis {
    summary: string;
    isWarning: boolean;
    topComments: Comment[];
    languageDistribution: LanguageRatio[];
    sentimentDistribution: SentimentRatio;
    popularTimestamps: TimestampMention[];
    commentHistogram: HourlyCommentCount[];
    keywords: string[];
}

export interface Comment {
    id: string;
    author: string;
    text: string;
    likeCount: number;
    sentiment: 'positive' | 'negative' | 'other';
    detailEmotion?: string[];
    publishedAt: string;
    hasReplies?: boolean;
    replies?: Reply[];
}

export interface Reply {
    id: string;
    author: string;
    text: string;
    likeCount: number;
    publishedAt: string;
}

export interface LanguageRatio {
    language: string;
    ratio: number;
}

export interface SentimentRatio {
    positive: number;
    negative: number;
    other: number;
}

export interface TimestampMention {
    time: string;
    mentionCount: number;
}

export interface HourlyCommentCount {
    hour: string;
    count: number;
}

export interface SentimentFlowData {
    date: string;
    positive: number;
    negative: number;
    other: number;
}

export interface VideoBasicInfo {
    video: VideoDetail;
    channel: Channel;
}

export interface VideoAnalysisInfo {
    commentHistogram: HourlyCommentCount[];
    popularTimestamps: TimestampMention[];
    sentimentFlow: SentimentFlowData[];
    topComments: Comment[];
}

export interface VideoAIAnalysis {
    summary: string | null;
    isWarning: boolean;
    languageDistribution: LanguageRatio[];
    sentimentDistribution: SentimentRatio;
    keywords: string[];
}

export type VideoBasicResponse = BaseApiResponse<VideoBasicInfo>;
export type VideoAnalysisResponse = BaseApiResponse<VideoAnalysisInfo>;
export type VideoCommentsResponse = BaseApiResponse<Comment[]>;
export type VideoAIResponse = BaseApiResponse<VideoAIAnalysis>;

export interface CommentRepliesResponse {
    timeStamp: string;
    message: string;
    data: {
        apiCommentId: string;
        replies: Reply[];
    };
}