import { VideoSummaryItem } from './video-preview.types';
import { ChannelSearchResult } from './channel.types';

export interface MainPageData {
    favoriteChannelVideo: FavoriteChannelData | null;
    trendingVideos: VideoSummaryItem[];
    scrapVideos: VideoSummaryItem[];
}

export interface FavoriteChannelData {
    channels: ChannelSearchResult[];
    latestVideo: VideoSummaryItem | null;
}