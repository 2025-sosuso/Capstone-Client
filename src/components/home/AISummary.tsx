import {SparklesIcon} from "@heroicons/react/24/outline";

export default function AISummary({content}: {content: string}) {
    return (
        <div className="flex gap-2 ">
            <SparklesIcon className="size-6 my-2" />
            <p className="text-sm w-full text-purple-600 bg-purple-50 p-3 rounded-xl">{content}</p>
        </div>
    );
}