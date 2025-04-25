import MenuButton from "@components/RootLayout/Sidebar/MenuButton";
import MenuLink from "@components/RootLayout/Sidebar/MenuLink";
import {UserCircleIcon} from '@heroicons/react/24/solid';
import {ArrowRightStartOnRectangleIcon} from "@heroicons/react/24/outline";

interface SideBarProps {
    isOpen: boolean;
}

const SideBar = ({isOpen} : SideBarProps) => {
    return (
        <div
            className={`h-[calc(100vh-48px)] bg-white transition-all duration-300 overflow-hidden 
            ${isOpen ? 'w-64' : 'w-0'} shrink-0`}
        >
            <div className="flex flex-col h-full p-5 whitespace-nowrap justify-between">
                <div className="flex flex-col gap-6">
                    <MenuButton
                        icon={<UserCircleIcon className="size-8" />}
                        text="김유저" onClick={() => {console.log("김유저")}} />

                    <div className="flex flex-col">
                        <MenuLink link='/' text="🏠 홈"/>
                        <MenuLink link='/trend' text="🔥 인기 급상승"/>
                        <MenuLink link='/scrap' text="🔖 스크랩"/>
                    </div>
                </div>
                <MenuButton
                    icon={<ArrowRightStartOnRectangleIcon className="size-5"/>}
                    text="로그아웃"
                    onClick={() => {console.log("로그아웃")}}
                />

            </div>
        </div>
    )

}

export default SideBar;