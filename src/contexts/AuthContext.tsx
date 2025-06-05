'use client';

import {createContext, useContext, useState, useEffect} from 'react';
import {UserInfo} from '@/types/user';

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInfo | null;
    handleLogin: () => void;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInfo | null>(null);
    const [mounted, setMounted] = useState(false);

    const handleLogin = () => {
        window.location.href = 'http://knu-sosuso.com:8080/oauth2/authorization/google';
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
        setIsLoggedIn(false);
        setUser(null);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if (!token) return;

        const verifyToken = async () => {
            try {
                const res = await fetch('http://knu-sosuso.com:8080/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Invalid token');
                const user = await res.json();
                setIsLoggedIn(true);
                setUser(user);
            } catch (err) {
                console.warn('토큰 만료/실패:', err);
                if (typeof window !== 'undefined') {
                    localStorage.clear();
                }
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        verifyToken();
    }, [mounted]);

    return (
        <AuthContext.Provider value={{isLoggedIn, user, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};