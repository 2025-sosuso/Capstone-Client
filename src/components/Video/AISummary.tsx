import EmptyState from "@components/ui/EmptyState";

type AISummaryProps = {
    summary?: string | null;
    size?: "sm" | "md";
    isLoading?: boolean;
};

export default function AISummary({ summary, size = "md", isLoading = false }: AISummaryProps) {
    const sizeStyle =
        size === "sm"
            ? "text-sm text-purple-700 p-3 overflow-auto h-16"
            : "text-sm text-purple-700 px-4 py-4";

    const hasSummary = summary && summary.trim().length > 0;

    if (isLoading) {
        return <EmptyState message="AI 요약 분석 중입니다" variant="loading" />;
    }

    if (!hasSummary) {
        return <EmptyState message="AI 요약 결과가 없습니다" />;
    }

    return (
        <div className="w-full">
            <p className={`w-full bg-purple-50 rounded-xl ${sizeStyle}`}>
                {summary}
            </p>
        </div>
    );
}