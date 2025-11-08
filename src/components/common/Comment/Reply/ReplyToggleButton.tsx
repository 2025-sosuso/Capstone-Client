import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface Props {
    isOpen: boolean;
    isLoading: boolean;
    onClick: () => void;
}

export default function ReplyToggleButton({ isOpen, isLoading, onClick }: Props) {
    if (isLoading) {
        return (
            <button
                disabled
                className="flex items-center gap-1 text-sm text-gray-600 font-semibold mt-1 w-fit opacity-50 cursor-not-allowed"
            >
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                답글 로딩 중...
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-semibold mt-1 w-fit transition-colors"
        >
            {isOpen ? (
                <>
                    <ChevronUpIcon className="w-4 h-4" />
                    답글 숨기기
                </>
            ) : (
                <>
                    <ChevronDownIcon className="w-4 h-4" />
                    답글 보기
                </>
            )}
        </button>
    );
}