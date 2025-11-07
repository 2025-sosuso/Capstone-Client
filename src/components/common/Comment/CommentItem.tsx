"use client";

import {useState} from "react";
import {HandThumbUpIcon, ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import {formatDate, formatNumber} from "@/utils/data-format";
import {Comment} from "@/types/video.types";
import ReplyItem from "./ReplyItem";
import {fetchCommentReplies} from "@/services/video.service";

type Props = Comment;

const SENTIMENT_LABEL = {
    positive: {text: "긍정", color: "bg-blue-100 text-blue-600"},
    negative: {text: "부정", color: "bg-red-100 text-red-600"},
    other: {text: "기타", color: "bg-gray-200 text-gray-600"},
} as const;

export default function CommentItem({
                                        id,
                                        author,
                                        text,
                                        likeCount,
                                        publishedAt,
                                        sentiment = "other",
                                        hasReplies = false,
                                        replies: initialReplies,
                                    }: Props) {
    const [isRepliesOpen, setIsRepliesOpen] = useState(false);
    const [replies, setReplies] = useState(initialReplies ?? []);
    const [isLoadingReplies, setIsLoadingReplies] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const badge = SENTIMENT_LABEL[sentiment] ?? SENTIMENT_LABEL.other;

    const handleToggleReplies = async () => {
        if (isRepliesOpen) {
            setIsRepliesOpen(false);
            return;
        }

        if (replies.length > 0) {
            setIsRepliesOpen(true);
            return;
        }

        setIsLoadingReplies(true);
        setLoadError(false);
        try {
            const fetchedReplies = await fetchCommentReplies(id);
            setReplies(fetchedReplies);
            setIsRepliesOpen(true);
        } catch (error) {
            console.error("대댓글 로딩 실패:", error);
            setLoadError(true);
        } finally {
            setIsLoadingReplies(false);
        }
    };

    return (
        <div className="w-full">
            <div className="p-4 sm:px-5 sm:py-4 rounded-xl bg-gray-100">
                <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-start gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-800 max-w-[200px] truncate">
                                {author}
                            </p>
                            <p className="text-sm text-gray-400 whitespace-nowrap">
                                {formatDate(publishedAt, true)}
                            </p>
                            <span
                                className={`text-xs px-2 py-[2px] rounded-full font-medium whitespace-nowrap ${badge.color}`}>
                                {badge.text}
                            </span>
                        </div>
                        <div className="flex gap-1 items-center flex-shrink-0">
                            <HandThumbUpIcon className="w-4 h-4 text-gray-400"/>
                            <p className="text-sm text-gray-500 whitespace-nowrap">
                                {formatNumber(likeCount)}
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{text}</p>

                    {hasReplies && (
                        <button
                            onClick={handleToggleReplies}
                            disabled={isLoadingReplies}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-semibold mt-1 w-fit disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoadingReplies ? (
                                <>
                                    <div
                                        className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"/>
                                    답글 로딩 중...
                                </>
                            ) : isRepliesOpen ? (
                                <>
                                    <ChevronUpIcon className="w-4 h-4"/>
                                    답글 숨기기
                                </>
                            ) : (
                                <>
                                    <ChevronDownIcon className="w-4 h-4"/>
                                    답글 보기
                                </>
                            )}
                        </button>
                    )}

                    {loadError && (
                        <p className="text-xs text-gray-500 mt-1">
                            답글을 불러오는데 실패했습니다. 다시 시도해주세요.
                        </p>
                    )}
                </div>
            </div>

            {hasReplies && isRepliesOpen && !isLoadingReplies && (
                <div className="ml-3.5 sm:ml-7 mt-2 space-y-2">
                    {replies.length > 0 ? (
                        replies.map((reply, index) => (
                            <div key={reply.id} className="relative pl-5 sm:pl-6">
                                <div
                                    className="absolute left-0 top-0 w-3.5 sm:w-5 h-10 border-l-2 border-b-2 border-gray-300 rounded-bl-lg"
                                />
                                {index !== replies.length - 1 && (
                                    <div className="absolute left-0 top-10 bottom-0 w-0.5 bg-gray-300"/>
                                )}
                                <ReplyItem {...reply} />
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-sm text-gray-500">
                            답글이 없습니다.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}