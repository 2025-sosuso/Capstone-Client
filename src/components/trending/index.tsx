'use client';

import {useState} from "react";
import CategoryBar from "@components/trending/CategoryBar";
import VideoSummaryList from "@components/common/VideoSummary/VideoSummaryList";
import {mockVideoSummaryList} from "@mock/video-summary-mock";

type CategoryType = 'latest' | 'music' | 'game';

const categories: { label: string; value: CategoryType }[] = [
    { label: "최신", value: "latest" },
    { label: "음악", value: "music" },
    { label: "게임", value: "game" },
];

export default function Trending() {
    const [isSelected, setIsSelected] = useState<CategoryType>("latest");
    const mockData = mockVideoSummaryList;

    /*const regionCode = "KR";
    const maxResults = 30;

    useEffect(() => {
        const fetchVideos = async () => {
            const url = `http://knu-sosuso.com:8080/api/trending/category?categoryType=${isSelected}&regionCode=${regionCode}&maxResults=${maxResults}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                console.log(`${isSelected} 응답 데이터:`);
                console.log(data);
            } catch (error) {
                console.error(`${isSelected} 요청 실패: `, error);
            }
        };

        fetchVideos();
    }, [isSelected]);*/

    return (
        <div className="w-full flex justify-center px-4 py-5">
            <div className="w-full max-w-screen-xl flex flex-col gap-10">

                <div className="flex items-center gap-2">
                    <span className="text-3xl">🔥</span>
                    <h1 className="text-2xl font-semibold text-gray-900">인기 급상승</h1>
                </div>

                <div className="flex border-b border-gray-200">
                    {categories.map(({ label, value }) => (
                        <CategoryBar
                            key={value}
                            category={label}
                            selected={value === isSelected}
                            onClick={() => setIsSelected(value)}
                        />
                    ))}
                </div>

                <VideoSummaryList data={mockData} />
            </div>
        </div>

    );
}