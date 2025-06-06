import CommentItem from "./CommentItem";
import type { Comment as CommentType } from "@/types/video";

type Props = {
    comments: CommentType[];
    color?: string;
};

export default function CommentList({ comments, color="100" }: Props) {
    if (!comments || comments.length === 0) {
        return (
            <div className="text-sm text-gray-400 px-2 py-1">
                댓글이 없습니다.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {comments.map((comment, index) => (
                <CommentItem key={index} {...comment} color={color} />
            ))}
        </div>
    );
}
