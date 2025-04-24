'use client'

import Link from 'next/link'
import MenuItem from "@components/layout/SideBar/MenuItem";

interface ItemProps {
    link: string;
    text: string;
}

const MenuLink = ({ link, text }: ItemProps) => {


    return (
        <Link href={link}>
            <MenuItem
                className={`cursor-pointer ${
                    location.pathname == link 
                        ? "bg-gray-100 hover:bg-gray-200" 
                        : "hover:bg-gray-100"}`}
            >
                {text}
            </MenuItem>
        </Link>
    );
};

export default MenuLink;
