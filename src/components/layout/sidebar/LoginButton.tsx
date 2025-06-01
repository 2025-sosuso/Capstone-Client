import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Props {
    isOpen: boolean;
    isLoggedIn: boolean;
    userName?: string;
    userProfileImage?: string;
    onClick?: () => void;
}

const LoginButton = ({ isOpen, isLoggedIn, userName, userProfileImage, onClick }: Props) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 w-full text-left transition-all duration-300"
    >
        {isLoggedIn && userProfileImage ? (
            <Image src={userProfileImage} alt="프로필" className="size-10 rounded-full mr-1.5" />
        ) : (
            <UserCircleIcon className="size-8 text-gray-600" />
        )}
        <span
            className={`transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {isLoggedIn ? userName : "로그인"}
        </span>
    </button>
);

export default LoginButton;