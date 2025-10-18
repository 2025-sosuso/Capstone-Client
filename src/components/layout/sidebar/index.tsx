import LoginButton from "../../common/LoginButton";
import LogoutButton from "./LogoutButton";
import MenuItem from "./MenuItem";
import { MenuItems } from "./side-bar-config";
import PopularSearchList from "./PopularSearchList";

interface SideBarProps {
    isOpen: boolean;
    isNarrow: boolean;
    isLoggedIn: boolean;
    userName?: string;
    userProfileImage?: string;
    onLogin: () => void;
    onLogout: () => void;
}

const SideBar = ({
                     isOpen,
                     isNarrow,
                     isLoggedIn,
                     userName,
                     userProfileImage,
                     onLogin,
                     onLogout,
                 }: SideBarProps) => (
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
                <LoginButton
                    role="sidebar"
                    isLoggedIn={isLoggedIn}
                    userName={userName}
                    userProfileImage={userProfileImage}
                    onClick={onLogin}
                />

                <nav className="flex flex-col">
                    {MenuItems.map((item) => (
                        <MenuItem key={item.href} {...item} />
                    ))}
                </nav>

                <PopularSearchList />
            </div>
            {isLoggedIn && <LogoutButton isOpen={isOpen} onLogout={onLogout} />}
        </div>
    </div>
);

export default SideBar;