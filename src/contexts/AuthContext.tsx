'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UserInfoResponse } from '@/types/user';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/service/authService';
import { buildRedirectUri, getApiBaseUrl } from '@/lib/url';

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInfoResponse['data'] | null;
    handleLogin: () => void;
    handleLogout: () => Promise<void>;
    setUserData: (user: UserInfoResponse['data'] | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInfoResponse['data'] | null>(null);

    const setUserData = useCallback((userData: UserInfoResponse['data'] | null) => {
        if (userData) {
            localStorage.setItem('auth', JSON.stringify(userData));
            setUser(userData);
            setIsLoggedIn(true);
        } else {
            localStorage.clear();
            setUser(null);
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogin = useCallback(() => {
        const apiUrl = getApiBaseUrl();
        const redirectUrl = encodeURIComponent(buildRedirectUri());
        window.location.assign(
            `${apiUrl}/oauth2/authorization/google?redirect_uri=${redirectUrl}`
        );
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('로그아웃 실패', error);
        } finally {
            setUserData(null);
            router.push('/');
            console.log('로그아웃 완료');
        }
    }, [router, setUserData]);

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

    const value = useMemo(
        () => ({ isLoggedIn, user, handleLogin, handleLogout, setUserData }),
        [isLoggedIn, user, handleLogin, handleLogout, setUserData]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
