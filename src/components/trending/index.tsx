'use client';

import { useState } from "react";
import CategoryBar from "@components/trending/CategoryBar";

type CategoryType = 'latest' | 'music' | 'game';

const categories: { label: string; value: CategoryType }[] = [
    { label: "최신", value: "latest" },
    { label: "음악", value: "music" },
    { label: "게임", value: "game" },
];

export default function Trending() {
    const [isSelected, setIsSelected] = useState<CategoryType>("latest");

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
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🔥</span>
                <h1 className="text-2xl font-semibold text-gray-900">인기 급상승</h1>
            </div>

            <div className="flex border-b border-gray-200 mb-6">
                {categories.map(({ label, value }) => (
                    <CategoryBar
                        key={value}
                        category={label}
                        selected={value === isSelected}
                        onClick={() => setIsSelected(value)}
                    />
                ))}
            </div>
        </div>
    );
}
