import VideoList from "@components/home/list-section/VideoList";

export default function TrendSection() {
    return (
        <div className="flex flex-col w-full px-7 py-5 gap-4 ">
            <h1 className="text-2xl font-semibold text-gray-900">🔥 인기 급상승</h1>
            <VideoList />
        </div>
        )
}