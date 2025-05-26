export default function Tag({text}: {text: string}) {
    return (
        <div className="w-fit h-fit px-[15px] py-[8px] rounded-full cursor-pointer text-sm bg-gray-100">
            {text}
        </div>
    )
}