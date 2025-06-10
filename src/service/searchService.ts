import api from "@/lib/axios";
import type { Comment } from "@/types/video";

export const searchByQuery = async (query: string) => {
    const res = await api.get("/search", {
        params: { query },
    });
    return res.data.data;
};

export const fetchFilteredComments = async ({
                                                videoId,
                                                q,
                                                sentiment,
                                                keyword,
                                            }: {
    videoId: string;
    q?: string;
    sentiment?: 'POSITIVE' | 'NEGATIVE' | 'OTHER';
    keyword?: string;
}): Promise<Comment[]> => {
    console.log("[API 호출됨]", { videoId, q, sentiment, keyword });
    const params = q ? { q } : sentiment ? { sentiment } : keyword ? { keyword } : {};
    const res = await api.get(`/videos/${videoId}/comments`, { params });
    return res.data.data.results;
};
