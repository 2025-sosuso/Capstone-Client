'use client';

import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileProps {
    role?: string;
    onClick?: () => void;
}

const UserProfile = ({ role = "other", onClick }: UserProfileProps) => {
    const { user } = useAuth();

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 p-3 text-left transition-all duration-300 rounded-full
                ${role === "sidebar" ? "hover:bg-gray-100 rounded-lg" : "pl-4 pr-5 py-2 bg-gray-300/50"}
                hover:bg-white`}
        >
            {user?.userProfileImage ? (
                <Image
                    src={user.userProfileImage}
                    width={10}
                    height={10}
                    alt="프로필"
                    className="size-10 rounded-full mr-1.5"
                />
            ) : (
                <UserCircleIcon className="size-8 text-gray-500"/>
            )}
            {user?.userName}
        </button>
    );
};

export default UserProfile;