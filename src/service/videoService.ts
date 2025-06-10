import api from "@/lib/axios";
import {BaseApiResponse} from "@/types/common";
import {VideoResult} from "@/types/video";
import {VideoSummaryItem} from "@/types/video-summary";

export const fetchVideoDetail = async (apiVideoId: string): Promise<VideoResult> => {
    const res = await api.get<BaseApiResponse<VideoResult>>(`/videos/${apiVideoId}`);
    return res.data.data;
};

export const createScrap = async (apiVideoId: string): Promise<number> => {
    const res = await api.post<BaseApiResponse<{ scrapId: number }>>(
        "/scraps", { apiVideoId }
    );
    return res.data.data.scrapId;
};

export const deleteScrap = async (scrapId: number): Promise<void> => {
    await api.delete(`/scraps/${scrapId}`);
}

export const fetchTrendingVideos = async (
    category: string,
    maxResults: number
): Promise<VideoSummaryItem[]> => {
    const res = await api.get<BaseApiResponse<VideoSummaryItem[]>>(
        "/trending/category",
        {
            params: {
                categoryType: category,
                maxResults,
            },
        }
    );
    return res.data.data;
};