'use client';

import { useState } from 'react';
import Header from "src/components/layout/header";
import SideBar from "src/components/layout/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex flex-col h-screen">
            <Header toggleAction={() => setIsOpen((prev) => !prev)} />
            <div className="flex flex-1 overflow-hidden">
                <SideBar isOpen={isOpen} />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
}