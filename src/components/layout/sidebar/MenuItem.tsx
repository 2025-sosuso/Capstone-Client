import Link from "next/link";
import { MenuItemType } from "./side-bar-config";

const MenuItem = ({ name, emoji, href }: MenuItemType) => (
    <Link href={href} className="block">
        <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100">
            <span className="text-xl">{emoji}</span>
            <span>{name}</span>
        </div>
    </Link>
);

export default MenuItem;