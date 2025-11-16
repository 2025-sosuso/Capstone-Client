"use client";

import {useState, useRef} from "react";
import {HandThumbUpIcon} from "@heroicons/react/24/solid";
import {formatDate, formatNumber} from "@/utils/data-format";
import {Comment} from "@/types/video.types";
import {fetchCommentReplies} from "@/services/video.service";
import {useTextSelection} from "@/hooks/useTextSelection";
import KeywordTooltip from "./KeywordTooltip";
import {ReplyList, ReplyToggleButton} from "@components/common/Comment/Reply";

type Props = Comment;

const SENTIMENT_LABEL = {
    POSITIVE: {text: "긍정", color: "bg-blue-100 text-blue-600"},
    NEGATIVE: {text: "부정", color: "bg-red-100 text-red-600"},
    OTHER: {text: "기타", color: "bg-gray-200 text-gray-600"},
} as const;

const DETAIL_SENTIMENTS_MAP: Record<string, { text: string; color: string }> = {
    JOY: {text: "기쁨", color: "bg-yellow-50 text-yellow-600 border border-yellow-300"},
    LOVE: {text: "사랑", color: "bg-rose-50 text-rose-600 border border-rose-300"},
    GRATITUDE: {text: "감사", color: "bg-emerald-50 text-emerald-600 border border-emerald-300"},
    ANGER: {text: "분노", color: "bg-red-50 text-red-600 border border-red-300"},
    SADNESS: {text: "슬픔", color: "bg-indigo-50 text-indigo-600 border border-indigo-300"},
    FEAR: {text: "두려움", color: "bg-purple-50 text-purple-600 border border-purple-300"},
    NEUTRAL: {text: "중립", color: "bg-gray-50 text-gray-500 border border-gray-300"},
};

export default function CommentItem({
                                        id,
                                        author,
                                        text,
                                        likeCount,
                                        publishedAt,
                                        sentiment = "OTHER",
                                        hasReplies = false,
                                        replies: initialReplies,
                                        detailSentiments = [],
                                    }: Props) {
    const [isRepliesOpen, setIsRepliesOpen] = useState(false);
    const [replies, setReplies] = useState(initialReplies ?? []);
    const [isLoadingReplies, setIsLoadingReplies] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const commentRef = useRef<HTMLDivElement>(null);
    const {selectedText, position, clearSelection} = useTextSelection(commentRef);

    const badge = SENTIMENT_LABEL[sentiment] ?? SENTIMENT_LABEL.OTHER;
    const displayEmotions = detailSentiments.slice(0, 3);

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
        <div className="w-full" ref={commentRef}>

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
                            {displayEmotions.map((emotion, index) => {
                                const emotionStyle = DETAIL_SENTIMENTS_MAP[emotion];
                                if (!emotionStyle) return null;
                                return (
                                    <span
                                        key={`${emotion}-${index}`}
                                        className={`text-xs px-2 py-[2px] rounded-full font-medium whitespace-nowrap ${emotionStyle.color}`}
                                    >
                                        {emotionStyle.text}
                                    </span>
                                );
                            })}
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
                        <ReplyToggleButton
                            isOpen={isRepliesOpen}
                            isLoading={isLoadingReplies}
                            onClick={handleToggleReplies}
                        />
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
                    <ReplyList replies={replies}/>
                </div>
            )}

            {selectedText && position && (
                <KeywordTooltip
                    keyword={selectedText}
                    position={{x: position.x, y: position.y, height: position.height}}
                    onClose={clearSelection}
                />
            )}
        </div>
    );
}