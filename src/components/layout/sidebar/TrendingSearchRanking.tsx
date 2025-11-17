'use client'

import {ChevronDownIcon, MinusIcon} from "@heroicons/react/24/outline";
import {TriangleUpIcon, TriangleDownIcon} from "@/components/icons";
import {useState, useEffect, useCallback} from "react";
import {formatTime} from "@/utils/data-format";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {TrendingSearchItem, SearchStatus} from "@/types";
import {getTrendingSearch} from "@/services/search.service";

const PREVIEW_COUNT = 3;
const TOTAL_COUNT = 10;

const StatusIcon = ({status}: { status: SearchStatus }) => {
    switch (status) {
        case "up":
            return <TriangleUpIcon className="text-red-500" size={16}/>;
        case "down":
            return <TriangleDownIcon className="text-blue-500" size={16}/>;
        case "same":
            return <MinusIcon className="w-4 h-4 text-gray-500 stroke-2"/>;
    }
};

const TrendingSearchItemComponent = ({
                                         rank,
                                         keyword,
                                         status,
                                         isRefreshing
                                     }: TrendingSearchItem & { isRefreshing: boolean }) => {
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

const TrendingSearchRanking = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [data, setData] = useState<TrendingSearchItem[]>([]);
    const [updateAt, setUpdateAt] = useState<string>('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const [parent] = useAutoAnimate();

    const fetchData = useCallback(async () => {
        try {
            const result = await getTrendingSearch();
            setData(result.items);
            setUpdateAt(result.updateAt);

            console.log('데이터 조회 완료', result);

            setIsRefreshing(true);
            setTimeout(() => {
                setIsRefreshing(false);
            }, 600);

        } catch (error) {
            console.error('데이터 조회 실패:', error);
            setError(true);
        }
    }, []);

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 5000); // 테스트 중엔 임시로 5초 지정

        return () => {
            clearInterval(interval);
        };
    }, [fetchData]);

    return (
        <div className="px-4 py-3 bg-gray-100 rounded-xl select-none">
            <div className="flex justify-between items-center">
                <h3 className="text-md">☄️ 핫한 검색어</h3>
                <ChevronDownIcon
                    onClick={() => setIsExpanded((v) => !v)}
                    className={`size-4 stroke-2 text-gray-400 cursor-pointer 
                    transition-transform duration-300 ease-out
                     ${isExpanded ? "rotate-180" : "rotate-0"}
                     `}
                />
            </div>

            <div ref={parent} className="mt-2">
                {error && (
                    <div className="text-sm text-gray-500 py-2">
                        데이터 조회 실패
                    </div>
                )}

                {!error && data.slice(0, PREVIEW_COUNT).map((i) => (
                    <TrendingSearchItemComponent
                        key={i.keyword}
                        {...i}
                        isRefreshing={isRefreshing}
                    />
                ))}

                {isExpanded && !error && (
                    <div>
                        {data.slice(PREVIEW_COUNT, TOTAL_COUNT).map((i) => (
                            <TrendingSearchItemComponent
                                key={i.keyword}
                                {...i}
                                isRefreshing={isRefreshing}
                            />
                        ))}
                        {updateAt && (
                            <span className="text-xs text-gray-400 block mt-2">
                                {formatTime(updateAt)} 업데이트
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingSearchRanking;