import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import {formatDate} from "@/utils/date";

export default function Comment(props: CommentType) {
    const { authorName, commentText, likeCount, publishedAt } = props;

export default function Comment({
                                    authorName,
                                    commentText,
                                    likeCount,
                                    publishedAt,
                                }: CommentProps) {
    return (
        <div className="flex min-w-[330px] h-fit px-[15px] py-[12px] gap-3 items-center justify-between bg-gray-100 rounded-xl">
            <div className="flex flex-col gap-2">
                <div className="flex gap-[5px]">
                    <p className="text-sm font-semibold">{authorName}</p>
                    <p className="text-sm font-light">{formatDate(publishedAt)}</p>
                </div>
                <p className="text-sm whitespace-pre-wrap">{commentText}</p>
            </div>

            <div className="flex gap-2 items-center">
                <HandThumbUpIcon className="size-5" />
                <p className="text-sm">{likeCount}</p>
            </div>
        </div>
    );
}

