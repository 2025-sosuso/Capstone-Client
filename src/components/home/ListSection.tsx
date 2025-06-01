import Link from "next/link";
import {VideoSummary} from "@/types/new-video";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import VideoList from "@components/common/VideoSummary/VideoList";

interface VideoListProps {
    type: "trending" | "scrap";
    data: VideoSummary[];
}

export default function ListSection({ type, data }: VideoListProps) {
    return (
        <div className="flex flex-col w-full gap-5">
            <Link href={`/${type}`} className="flex justify-between w-full">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {type === "trending" ? "🔥 인기 급상승" : "🔖 스크랩"}
                </h1>
                <ChevronRightIcon className="size-6" />
            </Link>
            <VideoList data={data} />
        </div>
    );
}
