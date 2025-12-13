'use client';

import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import MenuItem from "./MenuItem";
import { MenuItems } from "./side-bar-config";
import TrendingSearchRanking from "./TrendingSearchRanking";
import LoginButton from "@components/Sidebar/LoginButton";
import UserProfile from "@components/Sidebar/UserProfile";

interface SideBarProps {
    isOpen: boolean;
    isNarrow: boolean;
}

const Sidebar = ({ isOpen, isNarrow }: SideBarProps) => {
    const { isLoggedIn } = useAuth();

    return (
        <div
            className={`
                h-[calc(100vh-48px)] bg-white transition-all duration-300 overflow-hidden
                ${isNarrow
                ? `fixed top-12 left-0 z-50 shadow-xl w-60 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
                : `relative ${isOpen ? 'w-60' : 'w-0'} shrink-0`
            }
            `}
        >
            <div className="flex flex-col h-full p-5 justify-between whitespace-nowrap w-60">
                <div className="flex flex-col gap-3">
                    {isLoggedIn ? (<UserProfile role="sidebar" />) : (<LoginButton variant='sidebar'/>)}

                    <nav className="flex flex-col">
                        {MenuItems.map((item) => (
                            <MenuItem key={item.href} {...item} />
                        ))}
                    </nav>

                    <TrendingSearchRanking />
                </div>

                {isLoggedIn && <LogoutButton isOpen={isOpen} />}
            </div>
        </div>
    );
};

export default Sidebar;