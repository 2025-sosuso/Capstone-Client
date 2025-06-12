interface TagProps {
    text: string;
    size?: "sm" | "md";
    isSelected?: boolean;
    onClick?: () => void;
}

export default function TagItem({
                                    text,
                                    size = "md",
                                    isSelected = false,
                                    onClick,
                                }: TagProps) {
    const sizeClass =
        size === "sm"
            ? "text-xs px-2.5 py-1.5"
            : "text-[0.9rem] px-3 py-2 cursor-pointer";

    const selectedClass =
        size === "md" && isSelected
            ? "bg-green-100 text-green-700 border-green-300 font-semibold"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200/80 border-transparent";

    return (
        <button
            onClick={onClick}
            className={`
                rounded-full
                border
                ${sizeClass}
                whitespace-nowrap
                transition-all duration-150
                ${selectedClass}
            `}
        >
            {text}
        </button>
    );
}
