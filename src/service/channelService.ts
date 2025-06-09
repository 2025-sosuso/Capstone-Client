import api from "@/lib/axios";
import {BaseApiResponse} from "@/types/common";
import type {FavoriteChannel, FavoriteChannelListResponse} from "@/types/channel";


export const addFavoriteChannel = async (
    apiChannelId: string,
    apiChannelName: string,
    apiChannelThumbnail: string,
): Promise<number> => {
    const res = await api.post<BaseApiResponse<{ favoriteChannelId: number }>>(
        "/favorite-channels",
        { apiChannelId, apiChannelName, apiChannelThumbnail }
    );
    return res.data.data.favoriteChannelId;
};

export const removeFavoriteChannel = async (favoriteChannelId: number): Promise<void> => {
    await api.delete(`/favorite-channels/${favoriteChannelId}`);
};

export const fetchFavoriteChannels = async (): Promise<FavoriteChannel[]> => {
    const res = await api.get<FavoriteChannelListResponse>("/favorite-channels");
    return res.data.data;
};