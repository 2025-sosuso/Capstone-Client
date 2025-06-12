'use client';

import {useState} from 'react';
import RecentVideo from './RecentVideo';
import ChannelAvatarList from './ChannelAvatarList';
import {VideoSummaryItem} from '@/types/video-summary';
import {useAuth} from '@/contexts/AuthContext';
import LoginButton from '@/components/common/LoginButton';
import api from '@/lib/axios';
import {BaseApiResponse} from '@/types/common';
import {fetchFavoriteChannels} from '@/service/channelService';
import {ChannelSearchResult} from "@/types/channel";

interface Props {
    data: VideoSummaryItem | null;
    favoriteChannelList?: ChannelSearchResult[] | null;
}

export default function SubscribedChannels({ data, favoriteChannelList }: Props) {
    const { isLoggedIn, handleLogin } = useAuth();

    const [selectedVideo, setSelectedVideo] = useState<VideoSummaryItem | null>(data);
    const [channelList, setChannelList] = useState<ChannelSearchResult[]>(favoriteChannelList ?? []);

    const handleChannelSelect = async (channelId: string) => {
        try {
            const res = await api.get<BaseApiResponse<VideoSummaryItem>>(`/favorite-channels/${channelId}`);
            setSelectedVideo(res.data.data);
            console.log("관심채널 분석 요약 조회: ", res.data);
        } catch (e) {
            console.error('[Select] 채널 영상 조회 실패:', e);
            setSelectedVideo(null);
        }
    };

    const handleUpdateChannels = async () => {
        try {
            const updated = await fetchFavoriteChannels();
            setChannelList(updated);

            if (selectedVideo && !updated.some((c) => c.id === selectedVideo.channel.id)) {
                setSelectedVideo(null);
            }
        } catch (e) {
            console.error('[Update] 관심 채널 목록 갱신 실패:', e);
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
            <ChannelAvatarList
                channels={channelList}
                onSelectChannel={handleChannelSelect}
                onUpdateChannels={handleUpdateChannels}
            />
            <RecentVideo data={selectedVideo} />
        </div>
    );
}
