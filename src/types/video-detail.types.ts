import { VideoBasicInfo, VideoAnalysisInfo, VideoAIAnalysis, Comment, VideoUserState } from './video.types';
import { YouTubePlayerRef } from '@components/Videos/VideoInfo/YoutubePlayer';
import { MutableRefObject } from 'react';

export interface VideoDetailData {
    basicInfo: VideoBasicInfo | null;
    userState: VideoUserState | null;
    analysisInfo: VideoAnalysisInfo | null;
    comments: Comment[];
    aiAnalysis: VideoAIAnalysis | null;
}

export interface VideoDetailFiltered {
    comments: Comment[];
    keywordComments: Comment[];
    selectedKeyword: string | null;
}

export interface VideoDetailLoadingState {
    basic: boolean;
    analysis: boolean;
    comments: boolean;
    ai: boolean;
}

export interface VideoDetailState {
    isLoading: VideoDetailLoadingState;
    isProcessing: boolean;
    retryCount: number;
    error: boolean;
}

export type CommentFilterParams = {
    q?: string;
    sentiment?: 'positive' | 'negative' | 'other';
};

export interface VideoDetailActions {
    handleSeek: (timeString: string) => void;
    handleFilterComments: (filter: CommentFilterParams) => Promise<void>;
    handleKeywordFilter: (keyword: string) => Promise<void>;
    handleSearch: (q: string) => Promise<void>;
}

export interface UseVideoDetailReturn {
    data: VideoDetailData;
    filtered: VideoDetailFiltered;
    state: VideoDetailState;
    actions: VideoDetailActions;
    playerRef: MutableRefObject<YouTubePlayerRef | null>;
}