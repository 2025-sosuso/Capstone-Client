"use client";

import { useEffect, useState } from "react";
import type { Comment as CommentType } from "@/types/video";
import CommentItem from "@components/common/Comment/CommentItem";

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
            <div className="text-sm text-gray-400 px-2 py-1">
                댓글이 없습니다.
            </div>
        );
    }

    return (
        <div className="transition-opacity duration-500 ease-in-out">
            <CommentItem {...comments[index]} color={color} />
        </div>
    );
}