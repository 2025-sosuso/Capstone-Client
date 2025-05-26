import VideoInfo from "@components/detail/video-info";
import { mockVideoResponse } from "@/mock/video.mock";

export default function Detail() {
    // mock data
    const videoItem = mockVideoResponse.videoInfo.items[0];
    const comments = mockVideoResponse.commentInfo.allComments;

    return (
        <div className="flex flex-col w-full items-center gap-10">
            <VideoInfo item={videoItem} />

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
