const NoCommentItem = ({ message = "댓글이 없습니다." }: { message?: string }) => {
    return (
        <div className="w-full px-4 py-5 rounded-xl text-sm text-gray-400 bg-gray-50 text-center">
            {message}
        </div>
    );
};

export default NoCommentItem;
