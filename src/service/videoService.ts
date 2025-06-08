import api from "@/lib/axios";

export const createScrap = async (apiVideoId: string): Promise<number> => {
    const res = await api.post<{ scrapId: number }>("/scraps", { apiVideoId });
    return res.data.scrapId;
};

export const deleteScrap = async (scrapId: number): Promise<void> => {
    await api.delete(`/scraps/${scrapId}`);
};