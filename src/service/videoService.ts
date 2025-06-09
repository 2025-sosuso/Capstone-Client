import api from "@/lib/axios";
import {BaseApiResponse} from "@/types/common";
import {VideoResult} from "@/types/video";

export const fetchVideoDetail = async (apiVideoId: string): Promise<VideoResult> => {
    const res = await api.get<BaseApiResponse<VideoResult>>(`/detail/${apiVideoId}`);
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
};