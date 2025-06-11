import { MainPageResponse } from "@/types/main";

export async function fetchMainPageData(): Promise<MainPageResponse["data"]> {
    try {
        const res = await fetch("https://knu-sosuso.com/api/main", {
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`API 요청 실패: ${res.status}`);
        }

        const json = await res.json();
        console.log("[MainPage 응답 raw JSON]", json);

        const { favoriteChannelVideo, trendingVideos, scrapVideos } = json?.data ?? {};

        console.log("[MainPage 데이터 분해 결과]", {
            favoriteChannelVideo,
            trendingVideosLength: trendingVideos?.length ?? 0,
            scrapVideosLength: scrapVideos?.length ?? 0,
        });

        const hasValidFavoriteVideo =
            favoriteChannelVideo &&
            typeof favoriteChannelVideo.videoSummary === "object" &&
            favoriteChannelVideo.videoSummary !== null;

        return {
            favoriteChannelVideo: hasValidFavoriteVideo ? favoriteChannelVideo : null,
            trendingVideos: trendingVideos ?? [],
            scrapVideos: scrapVideos ?? [],
        };
    } catch (e) {
        console.warn("메인 페이지 데이터 로딩 실패", e);
        return {
            favoriteChannelVideo: null,
            trendingVideos: [],
            scrapVideos: [],
        };
    }
}
