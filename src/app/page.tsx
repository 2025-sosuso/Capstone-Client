'use client';

import { useEffect, useState } from "react";
import { fetchMainPageData } from "@/service/mainService";
import Home from "@/components/home";
import { MainPageData } from "@/types/main";
import LoadingSection from "@components/common/LoadingSection";

export default function Page() {
    const [data, setData] = useState<MainPageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMainPageData()
            .then((res) => setData(res))
            .catch((err) => {
                console.error("[메인페이지 데이터 에러]", err);
                setData(null);
            })
            .finally(() => {
                setIsLoading(false); // ✅ 반드시 로딩 상태 해제
            });
    }, []);

    if (isLoading) {
        return <LoadingSection message="데이터를 불러오고 있습니다..." />;
    }

    if (!data) {
        return <div>데이터 로딩 실패. 잠시 후 다시 시도해주세요.</div>;
    }

    return <Home data={data} />;
}
