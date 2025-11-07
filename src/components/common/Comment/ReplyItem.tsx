import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { formatDate, formatNumber } from "@/utils/data-format";
import { Reply } from "@/types/video.types";

type Props = Reply;

export default function ReplyItem({
                                      author,
                                      text,
                                      likeCount,
                                      publishedAt,
                                  }: Props) {
    return (
        <div className="w-full p-3 sm:p-4 rounded-lg bg-gray-50">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-700 max-w-[200px] truncate">
                            {author}
                        </p>
                        <p className="text-xs text-gray-400 whitespace-nowrap">
                            {formatDate(publishedAt, true)}
                        </p>
                    </div>
                    <div className="flex gap-1 items-center flex-shrink-0">
                        <HandThumbUpIcon className="w-3.5 h-3.5 text-gray-400" />
                        <p className="text-xs text-gray-500 whitespace-nowrap">
                            {formatNumber(likeCount)}
                        </p>
                    </div>
                </div>

                <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{text}</p>
            </div>
        </div>
    );
}