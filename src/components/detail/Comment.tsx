import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { formatDate } from "@/utils/date";
import type { Comment as CommentType } from "@/types/new-video";

export default function Comment(props: CommentType) {
    const { authorName, commentText, likeCount, publishedAt } = props;

    return (
        <div className="flex min-w-[330px] h-fit px-[15px] py-[12px] gap-3 items-center justify-between bg-gray-100 rounded-xl">
            <div className="flex flex-col gap-2">
                <div className="flex gap-[5px] items-center">
                    <p className="text-sm font-semibold">{authorName}</p>
                    <p className="text-sm text-gray-400">{formatDate(publishedAt)}</p>
                </div>
                <p className="text-sm whitespace-pre-wrap">{commentText}</p>
            </div>

            <div className="flex gap-2 items-center">
                <HandThumbUpIcon className="size-5 text-gray-400" />
                <p className="text-sm text-gray-400">{likeCount}</p>
            </div>
        </div>
    );
}
