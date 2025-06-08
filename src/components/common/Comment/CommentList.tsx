import CommentItem from "./CommentItem";
import type { Comment as CommentType } from "@/types/video";
import NoCommentItem from "@components/common/Comment/NoCommentItem";

type Props = {
    comments: CommentType[];
};

export default function CommentList({ comments }: Props) {
    if (!comments || comments.length === 0) {
        return (
            <NoCommentItem />
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {comments.map((comment, index) => (
                <CommentItem key={index} {...comment} />
            ))}
        </div>
    );
}
