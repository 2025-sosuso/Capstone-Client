type AISummaryProps = {
    summary?: string;
    size?: "sm" | "md";
};

export default function AISummary({ summary, size = "md" }: AISummaryProps) {
    const sizeStyle =
        size === "sm"
            ? "text-sm text-purple-700 p-3 line-clamp-1 truncate"
            : "text-md text-purple-700 px-4 py-4";

    const hasSummary = summary && summary.trim().length > 0;

    return (
        <div className="w-full">
            {hasSummary ? (
                <p className={`w-full bg-purple-50 rounded-xl whitespace-pre-line ${sizeStyle}`}>
                    {summary}
                </p>
            ) : (
                <div className="w-full bg-gray-50 text-center text-sm text-gray-400 px-4 py-4 rounded-xl">
                    AI 요약 결과가 없습니다.
                </div>
            )}
        </div>
    );
}
