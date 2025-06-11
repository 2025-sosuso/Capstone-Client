'use client';

import { useState } from 'react';
import RecentVideo from './RecentVideo';
import ChannelAvatarList from './ChannelAvatarList';
import { VideoSummaryItem } from '@/types/video-summary';
import { useAuth } from '@/contexts/AuthContext';
import LoginButton from '@/components/common/LoginButton';
import api from '@/lib/axios';
import { BaseApiResponse } from '@/types/common';

interface FavoriteChannel {
    id: string;
    title: string;
    handle: string;
    description: string;
    thumbnailUrl: string;
    subscriberCount: number;
    favoriteChannelId: number;
}

interface Props {
    data: VideoSummaryItem | null;
    favoriteChannelList?: FavoriteChannel[] | null;
}

export default function SubscribedChannels({ data, favoriteChannelList }: Props) {
    const { isLoggedIn, handleLogin } = useAuth();
    const [selectedVideo, setSelectedVideo] = useState<VideoSummaryItem | null>(data);

    const handleChannelSelect = async (channelId: string) => {
        console.log('[Select] 채널 선택됨:', channelId);
        try {
            const res = await api.get<BaseApiResponse<VideoSummaryItem>>(`/api/favorite-channels/${channelId}`);
            setSelectedVideo(res.data.data);
            console.log('[State] selectedVideo 변경됨:', res.data.data);
        } catch (e) {
            console.error('[Select] 채널 영상 조회 실패:', e);
            setSelectedVideo(null);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col w-full p-4 pt-5 gap-4 rounded-3xl bg-gray-100">
                <h1 className="text-2xl font-semibold text-gray-900">🌟 관심 채널의 최근 영상</h1>
                <div className="flex flex-col w-full items-center justify-center text-center py-20 gap-5">
                    <p className="text-lg">지금 로그인하고, 관심 채널의 영상 분석을 빠르게 확인해보세요!</p>
                    <LoginButton isLoggedIn={isLoggedIn} onClick={handleLogin} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full p-4 pt-5 gap-4 rounded-3xl bg-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">🌟 관심 채널의 최근 영상</h1>
            <ChannelAvatarList channels={favoriteChannelList ?? []} onSelectChannel={handleChannelSelect} />
            <RecentVideo data={selectedVideo} />
        </div>
    );
}
