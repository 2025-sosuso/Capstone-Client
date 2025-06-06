export interface VideoSearchResponse {
    timeStamp: string;
    message: string;
    data: {
        searchType: string; // URL or CHANNEL
        results: VideoResult[];
    };
}

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
    isScrapped: boolean;
    scrapId?: number | null;
}

export interface Channel {
    id: string;
    title: string;
    thumbnailUrl: string;
    subscriberCount: number;
    isFavorite: boolean;
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
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'OTHER';
    publishedAt: string;
}

export interface LanguageRatio {
    language: string;
    ratio: number; // ex) 0.82
}

export interface SentimentRatio {
    positive: number;
    negative: number;
    other: number;
}

export interface TimestampMention {
    time: string; // ex) "00:40"
    mentionCount: number;
}

export interface HourlyCommentCount {
    hour: string; // ex) "13"
    count: number;
}