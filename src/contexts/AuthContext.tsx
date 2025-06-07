'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { UserInfo } from '@/types/user';
import {router} from "next/client";

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInfo | null;
    handleLogin: () => void;
    handleLogout: () => void;
    setUserData: (user: UserInfo | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState<UserInfo | null>(null);

    const setUserData = (userData: UserInfo | null) => {
        if (userData) {
            localStorage.setItem('auth', JSON.stringify(userData));
            setUser(userData);
            setIsLoggedIn(true);
        } else {
            localStorage.clear();
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    const handleLogin = () => {
        window.location.href = 'https://knu-sosuso.com/oauth2/authorization/google';
    };

    const handleLogout = async () => {
        try {
            await fetch("https://knu-sosuso.com/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("로그아웃 실패", error);
        } finally {
            setUserData(null);
            router.push("/");
        }
    };

    useEffect(() => {
        const authString = localStorage.getItem('auth');
        if (!authString) return;

        try {
            const parsed = JSON.parse(authString);
            setUser(parsed);
            setIsLoggedIn(true);
        } catch (e) {
            console.warn('로컬 스토리지 파싱 오류', e);
            localStorage.clear();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
