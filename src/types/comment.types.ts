import {Comment} from "./video.types";

export interface CommentSearchResponse {
    timeStamp: string;
    message: string;
    data: {
        apiVideoId: string;
        results: Comment[];
    };
}