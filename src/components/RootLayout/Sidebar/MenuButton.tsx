import MenuItem from "@components/RootLayout/Sidebar/MenuItem";

interface ItemProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
}

const MenuButton = ({ icon, text, onClick }: ItemProps) => {
    return (
        <button
            onClick={onClick}
            className="w-full text-left"
        >
            <MenuItem className="cursor-pointer flex items-center gap-2">
                {icon} {text}
            </MenuItem>
        </button>
    );
};

export default MenuButton;
