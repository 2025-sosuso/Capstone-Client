import SubscribedChannels from "./subscribed-channels";
import ListSection from "./ListSection";
import { MainPageData } from "@/types/main";

interface Props {
    data: MainPageData;
}

export default function Home({ data }: Props) {
    const { favoriteChannelVideo, trendingVideos, scrapVideos } = data;

    if (!data) {
        return (
            <div className="text-center text-gray-500 py-20">
                홈 데이터를 불러오지 못했습니다. 로그인 상태를 확인하거나 잠시 후 다시 시도해 주세요.
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-10 py-5 items-center px-4">
            <div className="w-full max-w-screen-xl">
                <SubscribedChannels
                    data={favoriteChannelVideo?.videoSummary ?? null}
                    favoriteChannelList={
                        favoriteChannelVideo?.favoriteChannelList
                            ? favoriteChannelVideo.favoriteChannelList.map((item) => ({
                                id: item.apiChannelId,
                                title: item.apiChannelName,
                                handle: "",
                                description: "",
                                thumbnailUrl: item.apiChannelThumbnail,
                                subscriberCount: 0,
                                favoriteChannelId: item.favoriteChannelId,
                            }))
                            : null
                    }
                />

                <div className="flex flex-col w-full gap-10 py-5">
                    <ListSection type="trending" data={trendingVideos} />
                    <ListSection type="scraps" data={scrapVideos} />
                </div>
            </div>
        </div>
    );
}
