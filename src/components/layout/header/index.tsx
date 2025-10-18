'use client';

import HeaderSearch from "@components/layout/header/HeaderSearch";
import Logo from "@components/layout/header/Logo";
import SideBarToggleButton from "@components/layout/header/SideBarToggleButton";

export default function Header({ toggleAction }: { toggleAction: () => void }) {
    return (
        <header className="flex items-center px-5 py-2 gap-5 bg-white w-full h-[48px]">
            <SideBarToggleButton toggleAction={toggleAction} />

            <Logo />
            <div className="flex w-full justify-center">
                <HeaderSearch/>
            </div>
        </header>
    );
}