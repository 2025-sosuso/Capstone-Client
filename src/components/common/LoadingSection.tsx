export default function LoadingSection({ message = "로딩 중입니다..." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <p className="mt-4">{message}</p>
        </div>
    );
}
