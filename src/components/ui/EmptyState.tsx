interface Props {
    message: string;
    variant?: 'empty' | 'loading' | 'error';
    className?: string;
}

export default function EmptyState({
                                       message,
                                       variant = 'empty',
                                       className = ''
                                   }: Props) {
    const styles = {
        empty: "bg-gray-50 text-gray-400",
        loading: "bg-gray-100 text-gray-500 animate-pulse",
        error: "bg-red-50 text-red-500"
    };

    const icons = {
        empty: "📭",
        loading: "⏳",
        error: "⚠️"
    };

    return (
        <div className={`w-full p-4 flex items-center justify-center text-center text-sm rounded-xl ${styles[variant]} ${className}`}>
            <span className="mr-2">{icons[variant]}</span>
            {message}
        </div>
    );
}