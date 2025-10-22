import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import VideoSummaryList from "@components/common/VideoSummary/VideoSummaryList";
import type { VideoSummaryItem } from "@/types/video-summary";

type SectionType = "trending" | "scraps";

interface ListSectionProps {
    type: SectionType;
    data: VideoSummaryItem[];
}

const SECTION_CONFIG = {
    trending: {
        title: "🔥 인기 급상승",
        href: "/trending"
    },
    scraps: {
        title: "🔖 스크랩",
        href: "/scraps"
    }
} as const;

export default function ListSection({ type, data }: ListSectionProps) {
    const { title, href } = SECTION_CONFIG[type];

    return (
        <div className="flex flex-col w-full gap-5">
            <Link
                href={href}
                className="flex justify-between items-center w-full group"
            >
                <h2 className="text-2xl font-semibold text-gray-900">
                    {title}
                </h2>
                <ChevronRightIcon className="size-6" />
            </Link>
            <VideoSummaryList data={data} type={type} />
        </div>
    );
}