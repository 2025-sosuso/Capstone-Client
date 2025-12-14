import {CommentItem, NoCommentItem} from "@components/Video/Comment/index";
import type {Comment as CommentType} from "@/types/video.types";
import {useLoadMore} from "@/hooks/useLoadMore";

type Props = {
    comments: CommentType[];
};

export default function CommentList({comments}: Props) {
    const {displayedItems, hasMore, loadMore} = useLoadMore({
        items: comments,
        itemsPerPage: 20,
    });

    if (!comments || comments.length === 0) {
        return <NoCommentItem/>;
    }

    return (
        <div className="flex flex-col gap-2">
            {displayedItems.map((comment, index) => (
                <CommentItem key={comment.id || index} {...comment} />
            ))}

            {hasMore && (
                <button
                    onClick={loadMore}
                    className="w-full py-3 mt-2 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors text-sm text-gray-600 font-medium"
                >
                    댓글 더보기
                </button>
            )}

            {!hasMore && comments.length > 20 && (
                <div className="w-full py-3 text-center text-sm text-gray-400">
                    모든 댓글을 불러왔습니다
                </div>
            )}
        </div>
    );
}