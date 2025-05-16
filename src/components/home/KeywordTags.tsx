import {FaceSmileIcon} from "@heroicons/react/24/outline";

const KeywordTagItem = ({keyword}: { keyword: string }) => {
    return (
        <span className="text-xs text-gray-700 bg-gray-100 px-3 py-2 rounded-full w-fit h-fit truncate">
            {keyword}
        </span>
    )
}

export default function KeywordTags({keywords}: { keywords: string[] }) {
    return (
        <div className="flex gap-2 items-center">
            <FaceSmileIcon className="size-6"/>
            <div className="flex gap-2">
                {keywords.map((k, i) => (
                    <KeywordTagItem key={i} keyword={k}/>
                ))}
            </div>
        </div>
    );
}
