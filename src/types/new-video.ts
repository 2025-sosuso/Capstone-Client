export interface VideoApiResponse {
    timeStamp: string;
    message: string;
    data: Video;
}

export interface VideoSummaryListResponse {
    timeStamp: string;
    message: string;
    data: VideoSummary[];
}

export interface Video {
    id: string,
    publishedAt: string,
    title: string,
    description: string,
    thumbnailUrl: string,
    channel: Channel,
    viewCount: number,
    likeCount: number,
    commentCount: number,
    comments: Comment[],
    analysis: Analysis,
}

export interface VideoSummary {
    id: string,
    publishedAt: string,
    title: string,
    thumbnailUrl: string,
    channel: Channel,
    viewCount: number,
    likeCount: number,
    commentCount: number,
    analysis: SummaryAnalysis,
}

export interface Channel {
    id: string;
    title: string;
    thumbnailUrl: string;
    subscribeCount: number;
}

export interface Analysis {
    aiSummary: string;
    commentsTop5: Comment[];
    languageRatio: Language[];
    emotionRatio: Emotion;
    popularTimeTags: string[];
    commentTimes: commentTime[];
    keywordTags: string[];
}

export type SummaryAnalysis = Pick<Analysis, 'aiSummary' | 'emotionRatio' | 'keywordTags'>;


export interface Comment {
    authorName: string;
    commentText: string;
    likeCount: number;
    publishedAt: string;
}

export interface Language {
    language: string;
    value: number;
}

export interface Emotion {
    positive: number,
    negative: number,
    etc: number,
}

export interface commentTime {
    time: string;
    count: number;
}