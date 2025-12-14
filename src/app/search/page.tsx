import { Suspense } from 'react';
import LoadingSection from "@components/ui/LoadingSection";
import SearchContent from "@/app/search/_components/Search";

export default function SearchPage() {
    return (
        <Suspense fallback={<LoadingSection message="검색 페이지 로딩 중..." />}>
            <SearchContent />
        </Suspense>
    );
}