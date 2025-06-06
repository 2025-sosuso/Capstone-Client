'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { UserInfo } from '@/types/user';

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInfo | null;
    handleLogin: () => void;
    handleLogout: () => void;
    setUserData: (user: UserInfo | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    const handleLogout = () => {
        setUserData(null);
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
