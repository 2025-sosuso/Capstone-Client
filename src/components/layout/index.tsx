'use client';

import { useState } from 'react';
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    const { isLoggedIn, user, handleLogin, handleLogout } = useAuth();

    return (
        <div className="flex flex-col h-screen">
            <Header toggleAction={() => setIsOpen((prev) => !prev)} />
            <div className="flex flex-1 overflow-hidden">
                <SideBar
                    isOpen={isOpen}
                    isLoggedIn={isLoggedIn}
                    userName={user?.userName}
                    userProfileImage={user?.userProfileImage}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
}