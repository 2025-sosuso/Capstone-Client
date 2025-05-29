import VideoInfo from "@components/detail/video-info";
import { mockVideoResponse } from "@/mock/video.mock";

export default function Detail() {
    // mock data
    const mockData = mockVideoData.data
    const aiSummary = mockData.video.analysis.aiSummary;
    const commentsAll = mockData.video.comments;
    const commentsTop5 = mockData.video.analysis.commentsTop5;
    const languageRatio = mockData.video.analysis.languageRatio;
    const commentTimes = mockData.video.analysis.commentTimes;
    const popularTimeTags = mockData.video.analysis.popularTimeTags;
    const keywordTags = mockData.video.analysis.keywordTags;

    return (
        <div className="flex flex-col w-full items-center max-w-[1000px] m-auto gap-10">
            <VideoInfo data={mockData.video}/>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                <div className="col-auto">
                   {/*왼쪽*/}
                </div>
                <div className="col-auto">
                    {/*오른쪽*/}
                </div>
            </div>
        </div>
    );
}
