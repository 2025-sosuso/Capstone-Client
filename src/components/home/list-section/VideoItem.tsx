import {FC} from 'react';
import Thumbnail from "@components/home/Thumbnail";
import EmotionBar from "@components/home/EmotionBar";
import KeywordTag from "@components/home/KeywordTag";
import AISummary from "@components/home/AISummary";
import {FaceSmileIcon} from "@heroicons/react/24/outline";

type TrendVideoItemProps = {
    rank: number;
    title: string;
    thumbnailUrl: string;
    channelName: string;
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
        <div className="flex flex-col lg:flex-row gap-8 p-4 rounded-xl bg-white">
            <div className="flex gap-6 flex-1 min-w-0">
                <span className="text-xl font-bold  w-6">{rank}</span>

                <div className="w-[240px] overflow-hidden rounded-2xl">
                    <Thumbnail src={thumbnailUrl}/>
                </div>

                <div className="flex flex-col justify-between flex-1 min-h-[60px] w-2/5">
                    <p className="font-semibold text-sm line-clamp-2">{title}</p>
                    <p className="text-xs text-gray-500">
                        {channelName} · 조회수 {views.toLocaleString()} · 댓글 {commentsCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">좋아요 {likes.toLocaleString()}개</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-0">
                <AISummary content={aiSummary}/>
                <EmotionBar positive={emotionRatio.positive} negative={emotionRatio.negative} etc={emotionRatio.etc}/>
                <div className="flex gap-2 items-center">
                    <FaceSmileIcon className="size-6 my-2"/>
                    <div className="flex gap-2">
                        {keywords.map((k, i) => (
                            <KeywordTag key={i} keyword={k}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default VideoItem;
