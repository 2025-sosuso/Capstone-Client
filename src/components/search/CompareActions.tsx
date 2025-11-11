'use client';

import {useCompare} from "@/contexts/CompareContext";

export default function CompareActions() {
    const {compareMode, toggleCompareMode, selectedVideos, goToCompare} = useCompare();

    if (!compareMode) {
        return (
            <button
                onClick={toggleCompareMode}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100/70 text-blue-600 rounded-xl hover:bg-blue-100 transition-all font-medium cursor-pointer"
            >
                영상 비교
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {/* 선택 개수 배지 */}
            <div className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-medium">
                {selectedVideos.length}/3
            </div>

            {/* 비교하기 (2개 이상) */}
            {selectedVideos.length >= 2 && (
                <button
                    onClick={goToCompare}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-medium shadow-sm cursor-pointer"
                >
                    비교하기
                </button>
            )}

            {/* 닫기 아이콘 버튼 */}
            <button
                onClick={toggleCompareMode}
                className="px-3 py-2 text-gray-500 bg-gray-100 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-all cursor-pointer"
            >
                취소
            </button>
        </div>
    );
}