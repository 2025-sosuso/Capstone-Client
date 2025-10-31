import SubscribedChannels from './subscribed-channels';
import ListSection from './ListSection';
import { MainPageData } from '@/types/main.types';

interface Props {
    data: MainPageData;
    isLoading: {
        favoriteChannels: boolean;
        trending: boolean;
        scraps: boolean;
    };
}

export default function Home({ data, isLoading }: Props) {
    const { favoriteChannelVideo, trendingVideos, scrapVideos } = data;

    return (
        <div className="w-full flex flex-col gap-10 py-5 items-center px-4">
            <div className="w-full max-w-screen-xl">
                <SubscribedChannels
                    data={favoriteChannelVideo?.latestVideo ?? null}
                    favoriteChannelList={favoriteChannelVideo?.channels ?? []}
                    isLoading={isLoading.favoriteChannels}
                />

                <div className="flex flex-col w-full gap-10 py-5">
                    <ListSection
                        type="trending"
                        data={trendingVideos}
                        isLoading={isLoading.trending}
                    />
                    <ListSection
                        type="scraps"
                        data={scrapVideos}
                        isLoading={isLoading.scraps}
                    />
                </div>
            </div>
        </div>
    );
}