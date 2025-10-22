'use client'

import { ChevronDownIcon, MinusIcon } from "@heroicons/react/24/outline";
import TriangleUpIcon from "public/icons/triangle-up.svg";
import TriangleDownIcon from "public/icons/triangle-down.svg";
import React from "react";
import { formatTime } from "@/utils/data-format";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type SearchStatus = "up" | "down" | "same";

interface PopularSearch {
    rank: number;
    keyword: string;
    status: SearchStatus;
}

const PREVIEW_COUNT = 3;
const TOTAL_COUNT = 10;

const mockList: PopularSearch[] = [
    { rank: 1, keyword: "승헌쓰", status: "up" },
    { rank: 2, keyword: "아이유", status: "same" },
    { rank: 3, keyword: "MBC 뉴스", status: "down" },
    { rank: 4, keyword: "야구 우승팀", status: "same" },
    { rank: 5, keyword: "영화 추천", status: "up" },
    { rank: 6, keyword: "타입스크립트", status: "down" },
    { rank: 7, keyword: "프론트엔드", status: "same" },
    { rank: 8, keyword: "Vercel 배포 가이드", status: "up" },
    { rank: 9, keyword: "shadcn/ui 컴포넌트", status: "same" },
    { rank: 10, keyword: "웹 성능 최적화 방법", status: "down" }
];

const StatusIcon = ({ status }: { status: SearchStatus }) => {
    const iconClass = "w-4 h-4";
    switch (status) {
        case "up":
            return <TriangleUpIcon className={iconClass} />;
        case "down":
            return <TriangleDownIcon className={iconClass} />;
        case "same":
            return <MinusIcon className={`text-gray-500 stroke-2 ${iconClass}`} />;
    }
};

const PopularSearchItem = ({
                               rank,
                               keyword,
                               status,
                               isRefreshing
                           }: PopularSearch & { isRefreshing: boolean }) => {
    return (
        <div
            className={`flex items-center gap-2 text-sm py-1 transition-all duration-300
                ${isRefreshing ? 'refresh-item' : ''}
            `}
        >
            <span className="text-center text-gray-400 font-semibold w-4">
                {rank}
            </span>
            <span className="flex-1 truncate">{keyword}</span>
            <StatusIcon status={status}/>
        </div>
    );
};

const PopularSearchList = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [data, setData] = React.useState<PopularSearch[]>(mockList);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [lastUpdate, setLastUpdate] = React.useState(new Date().toISOString());
    const [parent] = useAutoAnimate();

    const fetchData = React.useCallback(async () => {
        try {

            // TODO: 실제 API 연동 필요
            setData(mockList);

            const now = new Date().toISOString();
            setLastUpdate(now);

            console.log('데이터 갱신 완료');

            setIsRefreshing(true);
            setTimeout(() => {
                setIsRefreshing(false);
            }, 600);

        } catch (error) {
            console.error('데이터 갱신 실패:', error);
        }
    }, []);

    React.useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 30000); // 30초 (test)

        return () => {
            clearInterval(interval);
        };
    }, [fetchData]);

    return (
        <div className="px-4 py-3 bg-gray-100 rounded-xl select-none">
            <div className="flex justify-between items-center">
                <h3 className="text-md">☄️ 인기 검색어</h3>
                <ChevronDownIcon
                    onClick={() => setIsExpanded((v) => !v)}
                    className={`size-4 stroke-2 text-gray-400 cursor-pointer 
                    transition-transform duration-300 ease-out
                     ${isExpanded ? "rotate-180" : "rotate-0"}
                     `}
                />
            </div>

            <div ref={parent} className="mt-2">
                {data.slice(0, PREVIEW_COUNT).map((i) => (
                    <PopularSearchItem
                        key={i.keyword}
                        {...i}
                        isRefreshing={isRefreshing}
                    />
                ))}

                {isExpanded && (
                    <div>
                        {data.slice(PREVIEW_COUNT, TOTAL_COUNT).map((i) => (
                            <PopularSearchItem
                                key={i.keyword}
                                {...i}
                                isRefreshing={isRefreshing}
                            />
                        ))}
                        <span className="text-xs text-gray-400 block mt-2">
                            {formatTime(lastUpdate)} 업데이트
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularSearchList;