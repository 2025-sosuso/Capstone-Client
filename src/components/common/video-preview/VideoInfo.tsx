import { formatDate, formatNumber } from "@/utils/data-format";
import type { VideoDetail } from "@/types/video.types";
import type { Channel } from "@/types/video.types";

interface Props {
    video: Pick<VideoDetail, 'title' | 'viewCount' | 'likeCount' | 'commentCount' | 'publishedAt'>;
    channel: Pick<Channel, 'title' | 'subscriberCount'>;
}

export default function VideoInfo({ video, channel }: Props) {
    return (
        <div className="flex flex-col flex-1 min-w-0">
            <p className="font-semibold text-base line-clamp-2">{video.title}</p>
            <p className="text-sm text-gray-500">
                {channel.title} | 구독자 {formatNumber(channel.subscriberCount)}명
            </p>
            <p className="text-sm text-gray-500">
                조회수 {formatNumber(video.viewCount)}회 · 업로드일 {formatDate(video.publishedAt)}
            </p>
            <p className="text-sm text-gray-400">
                좋아요 {formatNumber(video.likeCount)}개 · 댓글 {formatNumber(video.commentCount)}개
            </p>
        </div>
    );
}