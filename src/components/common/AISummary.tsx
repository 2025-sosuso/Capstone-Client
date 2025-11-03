import EmptyState from "@components/common/EmptyState";

type AISummaryProps = {
    summary?: string | null;
    size?: "sm" | "md";
};

export default function AISummary({ summary, size = "md" }: AISummaryProps) {
    const sizeStyle =
        size === "sm"
            ? "text-sm text-purple-700 p-3 overflow-auto h-16"
            : "text-md text-purple-700 px-4 py-4";

    const hasSummary = summary && summary.trim().length > 0;

    return (
        <div className="w-full">
            {hasSummary ? (
                <p className={`w-full bg-purple-50 rounded-xl ${sizeStyle}`}>
                    {summary}
                </p>
            ) : (
                <EmptyState message="AI 요약 결과가 없습니다" />
            )}
        </div>
    );
}
