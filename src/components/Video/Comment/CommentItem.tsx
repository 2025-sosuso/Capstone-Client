"use client";

import {useState, useRef} from "react";
import {HandThumbUpIcon} from "@heroicons/react/24/solid";
import {formatDate, formatNumber} from "@/utils/data-format";
import {Comment} from "@/types/video.types";
import {fetchCommentReplies} from "@/services/video.service";
import {useTextSelection} from "@/hooks/useTextSelection";
import KeywordTooltip from "./KeywordTooltip";
import {ReplyList} from "@components/Video/Comment/Reply";
import {CARD_COLORS, SENTIMENT_LABEL, DETAIL_SENTIMENTS_MAP} from "@/config/comment.config";

type Props = Comment;

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
    const displaySentiments = detailSentiments.slice(0, 3);
    const showStacks = hasReplies && !isRepliesOpen;

    const handleToggleReplies = async () => {
        if (!hasReplies) return;

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
            <div className={`relative ${hasReplies ? 'group' : ''}`}>
                {showStacks && (
                    <>
                        <div
                            className={`absolute inset-0 ${CARD_COLORS.main} ${CARD_COLORS.groupHover} rounded-xl -translate-y-1.5 -z-10 mb-1 mx-1 transition-colors`}/>
                        <div
                            className={`absolute inset-0 ${CARD_COLORS.blank} rounded-xl -translate-y-0.5 -z-10 transition-colors`}/>
                    </>
                )}

                <div
                    className={`p-4 sm:px-5 sm:py-4 rounded-xl ${CARD_COLORS.main} ${
                        hasReplies ? `cursor-pointer ${CARD_COLORS.groupHover} transition-colors` : ''
                    } ${showStacks ? 'mt-1' : ''}`}
                    onClick={handleToggleReplies}
                >
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
                                {displaySentiments.map((emotion, index) => {
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
                    </div>
                </div>
            </div>

            {hasReplies && (
                <>
                    {isLoadingReplies && (
                        <div className="ml-3 sm:ml-5 mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <div
                                className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"/>
                            답글 로딩 중...
                        </div>
                    )}

                    {loadError && (
                        <div className="ml-3 sm:ml-5 mt-2">
                            <p className="text-xs text-gray-500">
                                답글을 불러오는데 실패했습니다. 다시 시도해주세요.
                            </p>
                        </div>
                    )}

                    {isRepliesOpen && !isLoadingReplies && (
                        <div className="ml-3 sm:ml-5 mt-2 space-y-2">
                            <ReplyList replies={replies}/>
                        </div>
                    )}
                </>
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