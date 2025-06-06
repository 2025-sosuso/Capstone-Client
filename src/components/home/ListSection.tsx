import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import VideoSummaryList from "@components/common/VideoSummary/VideoSummaryList";
import {VideoSummaryResponse} from "@/types/video-summary";

interface Props {
    type: "trending" | "scraps";
    data: VideoSummaryResponse[];
}

export default function ListSection({ type, data }: Props) {
    return (
        <div className="flex flex-col w-full gap-5">
            <Link href={`/${type}`} className="flex justify-between w-full">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {type === "trending" ? "🔥 인기 급상승" : "🔖 스크랩"}
                </h1>
                <ChevronRightIcon className="size-6" />
            </Link>
            <VideoSummaryList data={data} type={type}/>
        </div>
    );
}
