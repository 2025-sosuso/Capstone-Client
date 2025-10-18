import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";

const Logo = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            router.refresh();
        }
    }

    return (
        <Link
            href='/'
            onClick={handleClick}
            className="flex items-center cursor-pointer shrink-0"
        >
            <Image src="/icons/logo.png" alt="logo" width={30} height={30}/>
            <p className="ml-2 font-bold text-md">Comments</p>
        </Link>
    );
}

export default Logo;