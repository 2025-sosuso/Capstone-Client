type AISummaryProps = {
    summary: string;
    size?: "sm" | "md";
};

export default function AISummary({ summary, size = "md" }: AISummaryProps) {
    const sizeStyle = size === "sm"
        ? "text-sm text-purple-700 p-3"
        : "text-md text-purple-700 px-4 py-4";

    return (
        <div className="w-full">
            <p className={`w-full bg-purple-50 rounded-xl whitespace-pre-line ${sizeStyle}`}>
                {summary}
            </p>
        </div>
    );
}
