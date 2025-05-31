type TagProps = {
    text: string;
    size?: "sm" | "md";
};

export default function Tag({text, size = "md"}: TagProps) {
    const sizeStyle = size === "sm"
        ? "text-xs px-3 py-2"
        : "text-[0.95em] px-4 py-2 cursor-pointer";

    return (
        <div className={`w-fit h-fit rounded-full bg-gray-100 ${sizeStyle}`}>
            <span className="whitespace-nowrap break-keep truncate">
                {text}
            </span>
        </div>
    );
}
