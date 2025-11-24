import api from "@/lib/axios";
import {BaseApiResponse} from "@/types/common.types";
import {
    Comment,
    CommentRepliesResponse,
    Reply,
    VideoAIAnalysis,
    VideoAIResponse,
    VideoAnalysisInfo,
    VideoAnalysisResponse,
    VideoBasicInfo,
    VideoBasicResponse,
    VideoCommentsResponse,
    VideoUserState,
    VideoUserStateResponse
} from "@/types/video.types";
import {AnalysisSummaryOnly, VideoSummaryItem} from "@/types/video-preview.types";

export const fetchVideoBasic = async (apiVideoId: string): Promise<VideoBasicInfo> => {
    const res = await api.get<VideoBasicResponse>(`/videos/${apiVideoId}/basic`);
    return res.data.data;
};

export const fetchVideoUserState = async (apiVideoId: string): Promise<VideoUserState> => {
    const res = await api.get<VideoUserStateResponse>(`/videos/${apiVideoId}/user-state`);
    return res.data.data;
}

export const fetchVideoAnalysis = async (apiVideoId: string): Promise<VideoAnalysisInfo> => {
    const res = await api.get<VideoAnalysisResponse>(`/videos/${apiVideoId}/analysis`);
    return res.data.data;
};

export const fetchVideoComments = async (apiVideoId: string): Promise<Comment[]> => {
    const res = await api.get<VideoCommentsResponse>(`/videos/${apiVideoId}/comments/all`);
    return res.data.data ?? [];
};

export const fetchVideoAI = async (apiVideoId: string): Promise<VideoAIAnalysis> => {
    const res = await api.get<VideoAIResponse>(`/videos/${apiVideoId}/ai`);
    return res.data.data;
};

// 프리뷰용 AI 분석 조회 (새로 추가)
export const fetchVideoAIPreview = async (apiVideoId: string): Promise<AnalysisSummaryOnly> => {
    const res = await api.get<VideoAIResponse>(`/videos/${apiVideoId}/ai`);
    return res.data.data;
};

export const fetchCommentReplies = async (apiCommentId: string): Promise<Reply[]> => {
    const res = await api.get<CommentRepliesResponse>(`/comments/${apiCommentId}/replies`);
    return res.data.data.replies ?? [];
};

export const createScrap = async (apiVideoId: string): Promise<number> => {
    const res = await api.post<BaseApiResponse<{ scrapId: number }>>(
        "/scraps", {apiVideoId}
    );
    return res.data.data.scrapId;
};

export const deleteScrap = async (scrapId: number): Promise<void> => {
    await api.delete(`/scraps/${scrapId}`);
};

export const fetchTrendingVideos = async (
    maxResults: number = 10
): Promise<VideoSummaryItem[]> => {
    const res = await api.get<BaseApiResponse<VideoSummaryItem[]>>(
        "/trending", {params: {maxResults}}
    );
    return res.data.data;
};

export const fetchScrapsVideos = async (): Promise<VideoSummaryItem[]> => {
    const res = await api.get<BaseApiResponse<VideoSummaryItem[]>>("/scraps");
    return res.data.data;
};