'use client';

import {createContext, useContext, useState, useEffect, useMemo, useCallback} from 'react';
import {UserInfoResponse} from '@/types/user.types';
import {useRouter} from 'next/navigation';
import {fetchAuthUser, logoutUser} from '@/services/auth.service';
import {buildRedirectUri, getApiBaseUrl} from '@/lib/url';
import Toast from '@components/ui/Toast';

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInfoResponse['data'] | null;
    handleLogin: () => void;
    handleLogout: () => Promise<void>;
    setUserData: (user: UserInfoResponse['data'] | null) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInfoResponse['data'] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    const setUserData = useCallback((userData: UserInfoResponse['data'] | null) => {
        if (userData) {
            localStorage.setItem('auth', JSON.stringify(userData));
            setUser(userData);
            setIsLoggedIn(true);
        } else {
            localStorage.removeItem('auth');
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
        }
    }, [router, setUserData]);

    useEffect(() => {
        const handleSessionExpired = () => {
            setShowToast(true);
            setUserData(null)

            setTimeout(() => {
                router.push('/');
            }, 1500);
        };

        window.addEventListener('auth:session-expired', handleSessionExpired);
        return () => window.removeEventListener('auth:session-expired', handleSessionExpired);
    }, [router, setUserData]);

    useEffect(() => {
        const verifySession = async () => {
            const authString = localStorage.getItem('auth');

            if (!authString) {
                setIsLoading(false);
                return;
            }

            try {
                const userData = await fetchAuthUser();
                setUserData(userData);
            } catch (error) {
                console.warn('세션 검증 실패:', error);
                setUserData(null);
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
    }, [setUserData]);

    const value = useMemo(
        () => ({isLoggedIn, user, handleLogin, handleLogout, setUserData, isLoading}),
        [isLoggedIn, user, handleLogin, handleLogout, setUserData, isLoading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}

            {showToast && (
                <Toast
                    message={`보안을 위해 자동 로그아웃되었습니다.\n다시 로그인해주세요.`}
                    onClose={() => setShowToast(false)}
                />
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};