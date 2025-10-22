import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { formatDate, formatNumber } from "@/utils/data-format";
import { Comment } from "@/types/video";

type Props = Comment & {
    color?: string;
};

const SENTIMENT_LABEL = {
    positive: { text: "긍정", color: "bg-blue-100 text-blue-600" },
    negative: { text: "부정", color: "bg-red-100 text-red-600" },
    other:    { text: "기타", color: "bg-gray-200 text-gray-600" },
} as const;

export default function CommentItem({
                                        author,
                                        text,
                                        likeCount,
                                        publishedAt,
                                        sentiment = "other",
                                    }: Props) {
    const badge = SENTIMENT_LABEL[sentiment] ?? SENTIMENT_LABEL.other;

    return (
        <div className="w-full p-4 sm:px-5 sm:py-4 rounded-xl bg-gray-100">
            <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-800 max-w-[200px] truncate">
                            {author}
                        </p>
                        <p className="text-sm text-gray-400 whitespace-nowrap">
                            {formatDate(publishedAt, true)}
                        </p>
                        <span className={`text-xs px-2 py-[2px] rounded-full font-medium whitespace-nowrap ${badge.color}`}>
                            {badge.text}
                        </span>
                    </div>
                    <div className="flex gap-1 items-center flex-shrink-0 {/*min-w-[55px]*/}">
                        <HandThumbUpIcon className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-500 whitespace-nowrap">
                            {formatNumber(likeCount)}
                        </p>
                    </div>
                </div>

                <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{text}</p>
            </div>
        </div>
    );
}