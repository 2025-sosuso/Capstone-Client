interface ErrorStateProps {
    title?: string;
    description?: string;
    emoji?: string;
    onRetry?: () => void;
    retryLabel?: string;
}

export default function ErrorState({
                                       title = "문제가 발생했습니다",
                                       description = "잠시 후 다시 시도해주세요.",
                                       emoji = "😕",
                                       onRetry,
                                       retryLabel = "새로고침",
                                   }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
            <span className="text-6xl">{emoji}</span>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            {description && <p className="text-gray-600 text-center">{description}</p>}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    {retryLabel}
                </button>
            )}
        </div>
    );
}