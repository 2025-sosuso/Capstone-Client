export interface VideoData {
    id: string;
    title: string;
    thumbnailUrl: string;
    channel: {
        name: string;
        profileImageUrl?: string;
        subscriberCount: string;
    };
    stats: {
        views: number;
        uploadedAt: string;
        likes: number;
        commentsCount: number;
    };
    aiSummary: {
        summaryText: string;
    };
    emotionRatio: {     // % 단위
        positive: number;
        negative: number;
        etc: number;
    };

    popularComments: CommentData[];
    allComments: CommentData[]; // 전체 댓글 목록
    keywordSummary: string[];
    topKeywords: Record<string, CommentData[]>;

    languageRatio: {
        [langCode: string]: number; // 'ko': 60, 'en': 20
    };
    highlightTimestamps: string[]; // ['01:00:36', '53:11', ...]
    commentTimestamps: {
        time: string;     // 영상 시간 예: '00:10'
        count: number;
    }[];
}

export interface CommentData {
    id: string;
    author: string;
    content: string;
    date: string;
    likeCount: number;
}