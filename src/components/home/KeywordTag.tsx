export default function KeywordTag({keyword}: { keyword: string }) {
    return (
        <span className="text-xs text-gray-700 bg-gray-100 px-3 py-2 rounded-full w-fit h-fit truncate">
            {keyword}
        </span>
    );
}
