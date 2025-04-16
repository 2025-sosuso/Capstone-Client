import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex flex-r shadow-md">
            <Link
                className="flex flex-c justify-center items-center "
                href="/public"
            >
                <Image
                    src="/icons/logo.png" alt="logo"
                    width="32"
                    height="32"
                />
                <p className="font-bold">Youtube Comments</p>
            </Link>

            <input type='text' placeholder="링크를 넣어보세요."/>
        </header>
    );
};