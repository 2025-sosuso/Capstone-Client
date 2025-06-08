import { BaseApiResponse } from "./common";

export type UserInfoResponse = BaseApiResponse<{
    userName: string;
    userEmail: string;
    userProfileImage: string;
}>;