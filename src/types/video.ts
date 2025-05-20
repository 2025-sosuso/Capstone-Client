export interface VideoData {
    videoInfo: VideoInfo;
    commentInfo: CommentInfo;
}

export interface VideoInfo {
    items: VideoItem[];
    pageInfo: PageInfo;
}

export interface VideoItem {
    id: string;
    snippet: VideoSnippet;
    statistics: VideoStatistics;
}

export interface VideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultAudioLanguage: string;
}

export interface VideoStatistics {
    viewCount: string;
    likeCount: string;
    commentCount: string;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface CommentInfo {
    allComments: CommentItem[];
}

export interface CommentItem {
    authorName: string;
    commentText: string;
    likeCount: number;
    publishedAt: string;
}