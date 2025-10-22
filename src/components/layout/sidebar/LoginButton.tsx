'use client';

import { useAuth } from "@/contexts/AuthContext";
import {UserCircleIcon} from "@heroicons/react/24/solid";

interface Props {
    variant?: "sidebar" | "default";
}

const LoginButton = ({variant = 'default'}: Props) => {
    const { handleLogin } = useAuth();
    const variantStyles = {
        sidebar: "rounded-lg transition-all duration-300 hover:bg-gray-100",
        default: "rounded-full pl-4 pr-5 py-2 bg-gray-300/50 hover:bg-gray-300"
    }

    return (
        <button
            onClick={handleLogin}
            className={`flex items-center gap-2 p-3 text-left ${variantStyles[variant]} cursor-pointer`}
        >
            <UserCircleIcon className="size-8 text-gray-500"/>
            로그인
        </button>
    );
};

export default LoginButton;