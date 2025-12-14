export interface MenuItemType {
    name: string;
    emoji: string;
    href: string;
}

export const MenuItems: MenuItemType[] = [
    { name: '홈', emoji: '🏠', href: '/' },
    { name: '지금 핫한', emoji: '🔥', href: '/trending' },
    { name: '스크랩', emoji: '🔖', href: '/scraps' },
];