'use client';

import ChannelAvatarList from '@components/home/subscribed-channels/ChannelAvatarList';
import Thumbnail from "@components/home/Thumbnail";
import {mockVideoData} from "@mock/video";
import {useAuth} from "@/contexts/AuthContext";
import LoginButton from "@components/common/LoginButton";

export default function SubscribedChannels() {
    const { isLoggedIn, handleLogin } = useAuth();

    return (
        <div className="flex flex-col w-full px-7 py-5 gap-4 rounded-3xl bg-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">🌟 관심 채널의 최근 영상</h1>
            {isLoggedIn ?
                <>
                    <ChannelAvatarList/>
                    <Thumbnail src={mockVideoData[0].thumbnailUrl}/>
                </>
            :   <div className="flex flex-col w-full items-center justify-center text-center py-8 gap-5">
                    <p className="text-lg">지금 로그인하고, 관심 채널의 영상 분석을 빠르게 확인해보세요!</p>
                    <LoginButton isLoggedIn={isLoggedIn} onClick={handleLogin} />
                </div>

            }
        </div>
    );
};