import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import MenuItem from "./MenuItem";
import { MenuItems } from "./side-bar-config";

interface SideBarProps {
    isOpen: boolean;
    isLoggedIn: boolean;
    userName?: string;
    userProfileImage?: string;
    onLogin: () => void;
    onLogout: () => void;
}

const SideBar = ({
                     isOpen,
                     isLoggedIn,
                     userName,
                     userProfileImage,
                     onLogin,
                     onLogout,
                 }: SideBarProps) => (
    <div
        className={`h-[calc(100vh-48px)] bg-white transition-all duration-300 overflow-hidden ${
            isOpen ? 'w-64' : 'w-0'
        } shrink-0`}
    >
        <div className="flex flex-col h-full p-5 justify-between whitespace-nowrap">
            <div className="flex flex-col gap-3">
                <LoginButton
                    isOpen={isOpen}
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
            </div>

            {isLoggedIn && <LogoutButton isOpen={isOpen} onLogout={onLogout} />}
        </div>
    </div>
);

export default SideBar;