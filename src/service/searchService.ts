import api from "@/lib/axios";

export const searchByQuery = async (query: string) => {
    const res = await api.get("/search", {
        params: { query },
    });
    return res.data.data;
};