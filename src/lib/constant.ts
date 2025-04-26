import {UserCircleIcon} from '@heroicons/react/24/solid';
import {ArrowRightStartOnRectangleIcon} from "@heroicons/react/24/outline";


interface SideBarItemType {
    name: string;
    emoji?: string;  // emoji는 optional
    icon?: React.ComponentType<{ className?: string }>;  // icon도 optional
    href?: string;
    action?: () => void;
}

export const SideBarItems: SideBarItemType[] = [
    { name: '로그인', icon: UserCircleIcon, action: ()=> console.log('login')},
    { name: '홈', emoji: '🏠', href: '/' },
    { name: '인기 급상승', emoji: '🔥', href: '/trend' },
    { name: '스크랩', emoji: '🔖', href: '/scrap' },
    { name: '로그아웃', icon: ArrowRightStartOnRectangleIcon, action: ()=> console.log('logout')},
]