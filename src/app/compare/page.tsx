import Compare from "@components/compare";
import {Suspense} from "react";
import LoadingSection from "@components/common/LoadingSection";

export default function Page() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSection message="영상 데이터를 불러오는 중..."/>
            </div>
        }>
            <Compare />
        </Suspense>
    );
}