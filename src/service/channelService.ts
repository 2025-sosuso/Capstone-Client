import api from "@/lib/axios";
import {BaseApiResponse} from "@/types/common";

export const addFavoriteChannel = async (
    apiChannelId: string,
    apiChannelName: string
): Promise<number> => {
    const res = await api.post<BaseApiResponse<{ favoriteChannelId: number }>>(
        "/favorite-channels",
        { apiChannelId, apiChannelName }
    );
    return res.data.data.favoriteChannelId;
};


export const removeFavoriteChannel = async (favoriteChannelId: number): Promise<void> => {
    await api.delete(`/favorite-channels/${favoriteChannelId}`);
};