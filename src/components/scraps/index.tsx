'use client';

import { useAuth } from "@/contexts/AuthContext";
import VideoSummaryList from "@components/common/VideoSummary/VideoSummaryList";
import { mockVideoSummaryList } from "@mock/video-summary-mock";
import LoginButton from "@components/common/LoginButton";

export default function Scraps() {
    const { isLoggedIn, handleLogin } = useAuth();
    const mockData = mockVideoSummaryList;

    return (
        <div className="w-full flex justify-center px-4 py-5">
            <div className="w-full max-w-screen-xl flex flex-col gap-10">
                <div className="flex items-center gap-2">
                    <span className="text-3xl">🔖</span>
                    <h1 className="text-2xl font-semibold text-gray-900">스크랩</h1>
                </div>

                {isLoggedIn ? (
                    <VideoSummaryList data={mockData} />
                ) : (
                    <div className="flex flex-col w-full items-center justify-center text-center py-20 gap-5 bg-gray-100 rounded-3xl">
                        <p className="text-lg"> 지금 로그인하고, 스크랩 영상을 빠르게 확인해보세요!</p>
                        <LoginButton isLoggedIn={isLoggedIn} onClick={handleLogin}/>
                    </div>
                )}
            </div>
        </div>
    );
}
