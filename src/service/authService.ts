import { UserInfoResponse } from '@/types/user';
import api from '@/lib/axios';

export const fetchAuthUser = async (): Promise<UserInfoResponse["data"]> => {
    const res = await api.get<UserInfoResponse>("/auth/login");
    return res.data.data;
};


export const logoutUser = async (): Promise<void> => {
    await api.post('/auth/logout');
};
