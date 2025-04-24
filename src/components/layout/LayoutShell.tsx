'use client';

import { useState } from 'react';
import Header from "@/components/layout/Header/Header";
import SideBar from "@/components/layout/SideBar/SideBar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex flex-col h-screen">
            <Header toggle={() => setIsOpen((prev) => !prev)} />
            <div className="flex flex-1 overflow-hidden">
                <SideBar isOpen={isOpen} />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
}