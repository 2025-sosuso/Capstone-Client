import SubscribedChannels from "@components/home/subscribed-channels";
import TrendSection from "src/components/home/list-section";

export default function Home() {
    return (
        <div className="flex flex-col gap-10">
            <SubscribedChannels />
            <TrendSection />
        </div>

    )
}