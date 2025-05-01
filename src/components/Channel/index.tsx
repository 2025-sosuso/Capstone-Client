'use client'; // YouTubePlayer나 내부에서 useState 쓰는 경우 필요

import Channel from '@/components/Channel/Channel';
import YouTubePlayer from '@components/youtube/YouTubePlayer';

const Index = () => {
    return (
        <div className="flex flex-col w-full px-7 py-5 gap-4 rounded-3xl bg-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">🌟 관심 채널의 최근 영상</h1>
            <Channel />
            <YouTubePlayer />
        </div>
    );
};

export default Index;
