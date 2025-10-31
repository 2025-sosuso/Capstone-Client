import {BaseApiResponse} from "./common.types";

export type UserInfoResponse = BaseApiResponse<{
    userName: string;
    userEmail: string;
    userProfileImage: string;
}>;