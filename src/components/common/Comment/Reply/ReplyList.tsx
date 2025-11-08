import {Reply} from "@/types/video.types";
import {ReplyItem} from "@/components/common/Comment/Reply";

interface Props {
    replies: Reply[];
}

export default function ReplyList({replies}: Props) {
    if (replies.length === 0) {
        return (
            <div className="p-4 text-center text-sm text-gray-500">
                답글이 없습니다.
            </div>
        );
    }

    return (
        <>
            {replies.map((reply, index) => (
                <div key={reply.id} className="relative pl-5 sm:pl-6">
                    <div
                        className="absolute left-0 top-0 w-3.5 sm:w-5 h-10 border-l-2 border-b-2 border-gray-300 rounded-bl-lg"/>
                    {index !== replies.length - 1 && (
                        <div className="absolute left-0 top-10 bottom-0 w-0.5 bg-gray-300"/>
                    )}
                    <ReplyItem {...reply} />
                </div>
            ))}
        </>
    );
}