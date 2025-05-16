import {FC} from 'react';
import Thumbnail from "@components/home/Thumbnail";
import EmotionBar from "@components/home/EmotionBar";
import KeywordTags from "@components/home/KeywordTags";
import AISummary from "@components/home/AISummary";

type TrendVideoItemProps = {
    rank: number;
    title: string;
    thumbnailUrl: string;
    channelName: string;
    subscriberCount: string;
    uploadAt: string;
    views: number;
    commentsCount: number;
    likes: number;
    emotionRatio: {
        positive: number;
        negative: number;
        etc: number;
    };
    keywords: string[];
    aiSummary: string;
};

const VideoItem: FC<TrendVideoItemProps> = ({
                                                rank,
                                                title,
                                                subscriberCount,
                                                uploadAt,
                                                thumbnailUrl,
                                                channelName,
                                                views,
                                                commentsCount,
                                                likes,
                                                emotionRatio,
                                                keywords,
                                                aiSummary,
                                            }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 cursor-pointer">
            <div className="flex gap-6 flex-1 min-w-0">
                <span className="text-xl font-bold w-6">{rank}</span>
                <div className="w-[260px] overflow-hidden rounded-2xl">
                    <Thumbnail src={thumbnailUrl}/>
                </div>
                <div className="flex flex-col flex-1 min-h-[60px] w-2/5">
                    <p className="font-semibold line-clamp-2">{title}</p>
                    <p className="text-sm text-gray-500">{channelName} | {subscriberCount}</p>
                    <p className="text-sm text-gray-500">조회수 {views.toLocaleString()} {uploadAt}</p>
                    <p className="text-sm text-gray-400">좋아요 {likes.toLocaleString()}개 댓글 {commentsCount}개</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-0 max-w-2/5">
                <AISummary content={aiSummary}/>
                <EmotionBar positive={emotionRatio.positive} negative={emotionRatio.negative} etc={emotionRatio.etc}/>
                <KeywordTags keywords={keywords}/>
            </div>
        </div>

    );
};

export default VideoItem;
