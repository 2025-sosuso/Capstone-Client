import Comment from "./Comment";
import type { Comment as CommentType } from "@/types/new-video";

type Props = {
    comments: CommentType[];
};

export default function CommentList({ comments }: Props) {
    return (
        <div className="flex flex-col gap-2">
            {comments.map((comment, index) => (
                <Comment key={index} {...comment} />
            ))}
        </div>
    );
}