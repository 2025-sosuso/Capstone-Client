'use client';

import Link from "next/link";
import Image from "next/image";
import HeaderSearch from "@components/layout/Header/HeaderSearch";

export default function Header({ toggleAction }: { toggleAction: () => void }) {
    return (
        <header className="flex items-center px-5 py-2 gap-5 bg-white w-full h-[48px]">
            <button className="cursor-pointer" onClick={toggleAction}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
            </button>
            <Link href='/' className="flex items-center cursor-pointer shrink-0">
                <Image src="/icons/logo.png" alt="logo" width={30} height={30}/>
                <p className="ml-2 font-bold text-md">Comments</p>
            </Link>
            <div className="flex w-full justify-center">
                <HeaderSearch/>
            </div>
        </header>
    );
}