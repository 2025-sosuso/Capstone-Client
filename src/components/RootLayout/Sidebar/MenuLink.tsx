'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuItem from "@components/RootLayout/Sidebar/MenuItem";

interface ItemProps {
    link: string;
    text: string;
}

const MenuLink = ({ link, text }: ItemProps) => {
    const pathname = usePathname(); // ✅ 이걸로 현재 경로 받아와야 함

    return (
        <Link href={link}>
            <MenuItem
                className={`cursor-pointer ${
                    pathname === link
                        ? "bg-gray-100 hover:bg-gray-200"
                        : "hover:bg-gray-100"
                }`}
            >
                {text}
            </MenuItem>
        </Link>
    );
};

export default MenuLink;
