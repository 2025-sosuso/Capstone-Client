import SubscribedChannels from "@components/home/subscribed-channels";
import {mockVideoSummaryListData} from "@mock/new-video-summary-mock";
import ListSection from "@components/home/ListSection";

export default function Home() {
    const trendData = mockVideoSummaryListData.data;
    const scrapData = mockVideoSummaryListData.data;

    return (
        <div className="flex flex-col w-full gap-10 py-5">
            <SubscribedChannels/>
            <div className="flex flex-col w-full gap-15 py-5">
                <ListSection type="trending" data={trendData}/>
                <ListSection type="scrap" data={scrapData}/>
            </div>
        </div>

    );

}