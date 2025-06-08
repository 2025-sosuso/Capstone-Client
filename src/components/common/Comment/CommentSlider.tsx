"use client";

import { useEffect, useState } from "react";
import type { Comment as CommentType } from "@/types/video";
import CommentItem from "@components/common/Comment/CommentItem";
import NoCommentItem from "@components/common/Comment/NoCommentItem";

type Props = {
    comments: CommentType[];
    intervalMs?: number;
    color?: string;
};

export default function CommentSlider({ comments, intervalMs = 8000, color = "100" }: Props) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % comments.length);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [comments.length, intervalMs]);

    if (!comments || comments.length === 0) {
        return (
            <NoCommentItem/>
        );
    }

    return (
        <div className="transition-opacity duration-500 ease-in-out">
            <CommentItem {...comments[index]} color={color} />
        </div>
    );
}