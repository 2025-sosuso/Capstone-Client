'use client';

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
    isOpen: boolean;
}

export default function LogoutButton({ isOpen }: Props) {
    const { handleLogout } = useAuth();

    const onLogoutClick = () => {
        const confirmed = window.confirm("정말 로그아웃하시겠습니까?");
        if (confirmed) {
            handleLogout();
        }
    };

    return (
        <button
            onClick={onLogoutClick}
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 w-full text-left transition-all duration-200"
        >
            <ArrowRightStartOnRectangleIcon className="w-6 h-6 text-gray-600" />
            <span
                className={`transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
            >
                로그아웃
            </span>
        </button>
    );
}