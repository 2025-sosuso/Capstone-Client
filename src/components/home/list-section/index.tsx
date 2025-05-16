import VideoList from "@components/home/list-section/VideoList";

export default function TrendSection() {
    return (
        <div className="flex flex-col w-full gap-5">
            <VideoList type={"trend"}/>
            <VideoList type={"scrap"}/>
        </div>
    );
}