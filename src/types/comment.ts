import { Comment } from "./video";

export interface CommentSearchResponse {
    timeStamp: string;
    message: string;
    data: {
        apiVideoId: string;
        results: Comment[];
    };
}
