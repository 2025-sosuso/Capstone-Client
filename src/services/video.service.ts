import api from "@/lib/axios";
import {BaseApiResponse} from "@/types/common.types";
import {
    Comment,
    VideoResult,
    VideoBasicResponse,
    VideoAnalysisResponse,
    VideoCommentsResponse,
    VideoAIResponse,
    VideoBasicInfo,
    VideoAnalysisInfo,
    VideoAIAnalysis
} from "@/types/video.types";
import {VideoSummaryItem} from "@/types/video-preview.types";

const normalizeSentiment = (comments: Comment[] | null | undefined): Comment[] =>
    (comments ?? []).map(comment => ({
        ...comment,
        sentiment: comment.sentiment?.toLowerCase?.() as 'positive' | 'negative' | 'other',
    }));

export const fetchVideoBasic = async (apiVideoId: string): Promise<VideoBasicInfo> => {
    const res = await api.get<VideoBasicResponse>(`/videos/${apiVideoId}/basic`);
    return res.data.data;
};

export const fetchVideoAnalysis = async (apiVideoId: string): Promise<VideoAnalysisInfo> => {
    const res = await api.get<VideoAnalysisResponse>(`/videos/${apiVideoId}/analysis`);
    const raw = res.data.data;

    return {
        ...raw,
        topComments: normalizeSentiment(raw.topComments),
    };
};

export const fetchVideoComments = async (apiVideoId: string): Promise<Comment[]> => {
    const res = await api.get<VideoCommentsResponse>(`/videos/${apiVideoId}/comments/all`);
    return normalizeSentiment(res.data.data);
};

export const fetchVideoAI = async (apiVideoId: string): Promise<VideoAIAnalysis> => {
    const res = await api.get<VideoAIResponse>(`/videos/${apiVideoId}/ai`);
    return res.data.data;
};

export const fetchVideoDetail = async (apiVideoId: string): Promise<VideoResult> => {
    const res = await api.get<BaseApiResponse<VideoResult>>(`/videos/${apiVideoId}`);
    const raw = res.data.data;

    return {
        ...raw,
        comments: normalizeSentiment(raw.comments),
        analysis: {
            ...raw.analysis,
            topComments: normalizeSentiment(raw.analysis?.topComments),
        },
    };
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