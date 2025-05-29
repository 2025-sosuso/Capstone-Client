import Video from "@components/Video/Video";

export interface VideoApiResponse {
    timeStamp: string;
    message: string;
    data: { video: Video };
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
    data?: Video
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
    popularTimeTags: string[];
    commentTimes: commentTime[];
    keywordTags: string[];

}

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


export interface commentTime {
    time: string;
    count: number;
}