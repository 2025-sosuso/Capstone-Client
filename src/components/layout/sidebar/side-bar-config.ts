export interface MenuItemType {
    name: string;
    emoji: string;
    href: string;
}

export const MenuItems: MenuItemType[] = [
    { name: '홈', emoji: '🏠', href: '/' },
    { name: '인기 급상승', emoji: '🔥', href: '/trending' },
    { name: '스크랩', emoji: '🔖', href: '/scraps' },
];