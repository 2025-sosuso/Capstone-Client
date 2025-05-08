'use client';

import Channel from '@/components/Channel/Channel';
import Video from "@components/Video/Video";
import {mockVideoData} from "@mock/video";
import Thumbnail from "@components/Thumbnail";


const Index = () => {
    return (
        <div className="flex flex-col w-full px-7 py-5 gap-4 rounded-3xl bg-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">🌟 관심 채널의 최근 영상</h1>
            <Channel />
            <Thumbnail />
            {/*<Video video={mockVideoData} />*/}
            {/*<YouTubePlayer />*/}
        </div>
    );
};

export default Index;
