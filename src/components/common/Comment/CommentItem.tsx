import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { formatDate } from "@/utils/date";
import {Comment} from "@/types/video";

type Props = Comment & {
    color?: string;
};

export default function CommentItem({
                                    author,
                                    text,
                                    likeCount,
                                    publishedAt,
                                    color = "100",
                                }: Props) {
    return (
        <div className={`flex min-w-[330px] h-fit px-[15px] py-[12px] gap-3 items-center justify-between bg-gray-${color} rounded-xl`}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-[5px] items-center">
                    <p className="text-sm font-semibold">{author}</p>
                    <p className="text-sm text-gray-400">{formatDate(publishedAt)}</p>
                </div>
                <p className="text-sm whitespace-pre-wrap">{text}</p>
            </div>

            <div className="flex gap-2 items-center">
                <HandThumbUpIcon className="size-5 text-gray-400" />
                <p className="text-sm text-gray-400">{likeCount}</p>
            </div>
        </div>
    );
}
