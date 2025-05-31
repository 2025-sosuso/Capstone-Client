import VideoList from "@components/home/list-section/VideoList";
import {mockVideoSummaryListData} from "@mock/new-video-summary-mock";

export default function TrendSection() {
    // mock data
    const trendData = mockVideoSummaryListData.data;
    const scrapData = mockVideoSummaryListData.data;

    return (
        <div className="flex flex-col w-full gap-5">
            <VideoList type={"trend"} data={trendData} />
            <VideoList type={"scrap"} data={scrapData} />
        </div>
    );
}
