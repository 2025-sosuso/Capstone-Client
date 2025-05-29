export default function Tag({text}: { text: string }) {
    return (
        <div className="w-fit h-fit px-4 py-2 rounded-full cursor-pointer bg-gray-100">
            <p className="text-[0.95em] whitespace-nowrap break-keep">
                {text}
            </p>
        </div>
    )
}