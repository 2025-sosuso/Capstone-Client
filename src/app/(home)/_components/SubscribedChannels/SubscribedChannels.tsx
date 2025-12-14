'use client';

import {useState, useEffect, useRef} from 'react';
import RecentVideo from './RecentVideo';
import ChannelAvatarList from './ChannelAvatarList';
import {VideoSummaryItem} from '@/types/video-preview.types';
import {useAuth} from '@/contexts/AuthContext';
import api from '@/lib/axios';
import {BaseApiResponse} from '@/types/common.types';
import {fetchFavoriteChannels} from '@/services/channel.service';
import {ChannelSearchResult} from "@/types/channel.types";
import LoginCallout from "@components/ui/LoginCallout";
import LoadingSection from "@components/ui/LoadingSection";

interface Props {
    data: VideoSummaryItem | null;
    favoriteChannelList: ChannelSearchResult[];
    isLoading: boolean;
}

export default function SubscribedChannels({data, favoriteChannelList, isLoading}: Props) {
    const {isLoggedIn} = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);

    const [selectedVideo, setSelectedVideo] = useState<VideoSummaryItem | null>(data);
    const [channelList, setChannelList] = useState<ChannelSearchResult[]>(favoriteChannelList);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setChannelList(favoriteChannelList);
    }, [favoriteChannelList]);

    useEffect(() => {
        setSelectedVideo(data);
    }, [data]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setEdit(false);
            }
        };

        if (edit) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [edit]);

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

    return (
        <div ref={containerRef} className="flex flex-col w-full p-4 pt-5 gap-4 rounded-3xl bg-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">🌟 관심 채널의 최근 영상</h1>
            {!isLoggedIn ? (
                <LoginCallout text="지금 로그인하고, 관심 채널의 영상 분석을 빠르게 확인해보세요!"/>
            ) : isLoading ? (
                <LoadingSection message="관심 채널을 불러오는 중..."/>
            ) : channelList.length == 0 ? (
                <div className="flex w-full items-center justify-center rounded-2xl px-5 py-12 text-center">
                    <p className="text-gray-600 text-lg">
                        마음에 드는 채널을 추가하여 새 소식을 빠르게 확인해보세요!
                    </p>
                </div>

            ) : (
                <>
                    <ChannelAvatarList
                        channels={channelList}
                        edit={edit}
                        setEdit={setEdit}
                        onSelectChannel={handleChannelSelect}
                        onUpdateChannels={handleUpdateChannels}
                    />
                    <RecentVideo data={selectedVideo}/>
                </>
            )}
        </div>
    );
}