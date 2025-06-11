import {VideoSummaryItem} from "@/types/video-summary";
import {BaseApiResponse} from "@/types/common";
import {Comment} from "@/types/video";

export interface FavoriteChannelInfo {
    favoriteChannelId: number;
    apiChannelId: string;
    apiChannelName: string;
    apiChannelThumbnail: string;
}

export interface FavoriteChannelVideo {
    favoriteChannelList: FavoriteChannelInfo[];
    videoSummary: VideoSummaryItem;
    topComments: Comment[];
}

export interface MainPageData {
    favoriteChannelVideo: FavoriteChannelVideo | null;
    trendingVideos: VideoSummaryItem[];
    scrapVideos: VideoSummaryItem[];
}

export type MainPageResponse = BaseApiResponse<MainPageData>;
