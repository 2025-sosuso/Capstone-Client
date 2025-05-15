import { mockVideoData } from '@/mock/video';
import VideoItem from './VideoItem';

export default function VideoList() {
    return (
        <>
            {mockVideoData.map((v, i) => (
                <VideoItem
                    key={v.id}
                    rank={i + 1}
                    title={v.title}
                    thumbnailUrl={v.thumbnailUrl}
                    channelName={v.channel.name}
                    views={v.stats.views}
                    commentsCount={v.stats.commentsCount}
                    likes={v.stats.likes}
                    emotionRatio={v.emotionRatio}
                    keywords={v.keywordSummary}
                    aiSummary={v.aiSummary.summaryText}
                />
            ))}
        </>
    );
}
