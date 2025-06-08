import api from "@/lib/axios";

export const addFavoriteChannel = async (channelId: string): Promise<void> => {
    await api.post("/favorite-channels", { channelId });
};

export const removeFavoriteChannel = async (channelId: string): Promise<void> => {
    await api.delete(`/favorite-channels/${channelId}`);
};