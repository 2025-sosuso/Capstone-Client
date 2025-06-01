'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sidebar";
import {UserInfo} from "@/types/user";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInfo | null>(null);

    const handleLogin = () => {
        window.location.href = 'http://knu-sosuso.com:8080/oauth2/authorization/google';
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.warn('토큰 없음, 로그인 상태 아님');
            return;
        }

        const verifyToken = async () => {
            try {
                const res = await fetch('http://knu-sosuso.com:8080/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('유효하지 않은 토큰, 로그아웃 처리');
                }

                const user = await res.json();
                setIsLoggedIn(true);
                setUser(user);
                console.log('토큰 유효, 로그인 유지:', user);
            } catch (err) {
                console.warn('토큰 만료 또는 오류:', err);
                localStorage.clear();
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        verifyToken();
    }, []);

    const userName = user?.userName;
    const userProfileImage = user?.userProfileImage;

    return (
        <div className="flex flex-col h-screen">
            <Header toggleAction={() => setIsOpen((prev) => !prev)} />
            <div className="flex flex-1 overflow-hidden">
                <SideBar
                    isOpen={isOpen}
                    isLoggedIn={isLoggedIn}
                    userName={userName}
                    userProfileImage={userProfileImage}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
