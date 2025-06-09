import { Suspense } from 'react';
import LoadingSection from "@components/common/LoadingSection";
import SearchContent from "@components/search";

export default function SearchPage() {
    return (
        <Suspense fallback={<LoadingSection message="검색 페이지 로딩 중..." />}>
            <SearchContent />
        </Suspense>
    );
}