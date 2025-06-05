import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Props {
    role?: string
    isLoggedIn: boolean;
    userName?: string;
    userProfileImage?: string;
    onClick?: () => void;
}

const LoginButton = ({role="other", isLoggedIn, userName, userProfileImage, onClick}: Props) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 p-3 text-left transition-all duration-300 cursor-pointer
        ${role === "sidebar" ? "hover:bg-gray-100 rounded-lg" : "pl-4 pr-5 py-2 bg-gray-300/50 hover:bg-gray-300 rounded-full" }`}

    >
        {isLoggedIn && userProfileImage ? (
            <Image src={userProfileImage} alt="프로필" className="size-10 rounded-full mr-1.5"/>
        ) : (
            <UserCircleIcon className="size-8 text-gray-600"/>
        )}
        {isLoggedIn ? userName : "로그인"}
    </button>
);

export default LoginButton;