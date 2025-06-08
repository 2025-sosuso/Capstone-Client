interface TagProps {
    text: string;
    size?: "sm" | "md";
    onClick?: () => void;
}

export default function TagItem({ text, size = "md", onClick }: TagProps) {
    const sizeClass = size === "sm" ? "text-xs px-2.5 py-1.5" : "text-[0.9rem] px-3 py-2 cursor-pointer";

    return (
        <button
            onClick={onClick}
            className={`bg-gray-100 rounded-full ${sizeClass} whitespace-nowrap text-gray-700 hover:bg-gray-200/80 transition duration-200`}
        >
            {text}
        </button>
    );
}
