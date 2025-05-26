import Comment from "./Comment";

type Props = {
    comments: {
        authorName: string;
        commentText: string;
        likeCount: number;
        publishedAt: string;
    }[];
};

export default function CommentList({ comments }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
                <Comment key={index} {...comment} />
            ))}
        </div>
    );
}
