import Link from "next/link";

interface Props {
    name: string;
    emoji?: string;
    icon?: React.ComponentType<{ className?: string }>;
    href?: string;
    action?: () => void;
}

const SideBarItem = ({ name, emoji, icon: Icon, href, action }: Props) => {
    if (!emoji && !Icon) {
        console.warn(`Item "${name}" is missing both emoji and icon.`);
    }

    return (
        <>
            {emoji && href && (
                <Link href={href} className="block">
                    <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100">
                        <span className="font-tossface text-xl">{emoji}</span>
                        <span>{name}</span>
                    </div>
                </Link>
            )}

            {Icon && action && (
                <button
                    onClick={action}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 w-full text-left"
                >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                </button>
            )}
        </>
    );
};

export default SideBarItem;
