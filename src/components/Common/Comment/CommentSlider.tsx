"use client";

import { useEffect, useState } from "react";
import type { Comment as CommentType } from "@/types/video.types";
import CommentItem from "@components/Common/Comment/CommentItem";
import NoCommentItem from "@components/Common/Comment/NoCommentItem";
import EmptyState from "@components/Common/EmptyState";

type Props = {
    comments: CommentType[];
    intervalMs?: number;
    isLoading?: boolean;
};

export default function CommentSlider({ comments, intervalMs = 7000, isLoading = false }: Props) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!comments || comments.length === 0) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % comments.length);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [comments, intervalMs]);

    if (isLoading) {
        return <EmptyState message="Top 5 댓글 분석 중입니다" variant="loading" />;
    }

    if (!comments || comments.length === 0) {
        return <NoCommentItem />;
    }

    return (
        <div className="w-full min-w-0 transition-opacity duration-500 ease-in-out">
            <CommentItem {...comments[index]} />
        </div>
    );
}