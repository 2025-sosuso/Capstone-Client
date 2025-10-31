export interface BaseApiResponse<T> {
    timeStamp: string;
    message: string;
    data: T;
}