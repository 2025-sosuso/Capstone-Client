import SubscribedChannels from "@components/home/subscribed-channels";
import ListSection from "@components/home/ListSection";
import {mockVideoSummaryList} from "@mock/video-summary-mock";

export default function Home() {
    const trending = mockVideoSummaryList;
    const scraps = mockVideoSummaryList;

    return (
        <div className="w-full flex flex-col gap-10 py-5 items-center px-4">
            <div className="w-full max-w-screen-xl">
                <SubscribedChannels />
                <div className="flex flex-col w-full gap-10 py-5">
                    <ListSection type="trending" data={trending} />
                    <ListSection type="scraps" data={scraps} />
                </div>
            </div>
        </div>
    );
}
