'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isNarrow, setIsNarrow] = useState(false);
    const { isLoggedIn, user, handleLogin, handleLogout } = useAuth();

    useEffect(() => {
        const checkWidth = () => {
            const narrow = window.innerWidth < 1280;
            setIsNarrow(narrow);

            if (narrow) setIsOpen(false);
            else setIsOpen(true);
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Header toggleAction={() => setIsOpen((prev) => !prev)} />
            <div className="flex flex-1 overflow-hidden relative">
                {isNarrow && isOpen && (
                    <div
                        className="fixed inset-0 top-12 z-40 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                <SideBar
                    isOpen={isOpen}
                    isNarrow={isNarrow}
                    isLoggedIn={isLoggedIn}
                    userName={user?.userName}
                    userProfileImage={user?.userProfileImage}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                />

                <main className="flex-1 p-6 overflow-auto relative">
                    {isNarrow && isOpen && (
                        <div
                            className="fixed inset-0 z-10"
                            style={{ top: '48px' }}
                            onClick={() => setIsOpen(false)}
                        />
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}