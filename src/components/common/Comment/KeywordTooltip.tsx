"use client";

import {useEffect, useState, memo, useMemo} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {fetchKeywordExplanation, KeywordExplanationResponse} from "@/services/keyword.service";

const TOOLTIP_CONFIG = {
    WIDTH: 320,
    PADDING: 16,
    GAP: 12,
    ARROW_SIZE: 8,
    MIN_TOP_SPACE: 100,
    ARROW_EDGE_MARGIN: 20,
    BG_COLOR: "rgb(55, 65, 81)", // bg-gray-700
    TEXT_COLOR: "white",
    ICON: "💡",
} as const;

interface Props {
    keyword: string;
    position: {
        x: number;
        y: number;
        height: number;
    };
    onClose: () => void;
}

function KeywordTooltip({keyword, position, onClose}: Props) {
    const [data, setData] = useState<KeywordExplanationResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadExplanation = async () => {
            setIsLoading(true);
            setError(false);

            try {
                const result = await fetchKeywordExplanation(keyword);
                if (isMounted) setData(result);
            } catch (err) {
                console.error("키워드 설명 로딩 실패:", err);
                if (isMounted) setError(true);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadExplanation();
        return () => {
            isMounted = false;
        };
    }, [keyword]);

    // 외부 클릭, 스크롤, ESC 키로 툴팁 닫기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.keyword-tooltip')) {
                onClose();
            }
        };

        const handleScroll = () => onClose();
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    // 툴팁 위치 계산
    const tooltipStyle = useMemo(() => {
        const {WIDTH, PADDING, GAP, MIN_TOP_SPACE, ARROW_EDGE_MARGIN} = TOOLTIP_CONFIG;

        // 좌우 위치 계산
        let left = position.x - WIDTH / 2;
        left = Math.max(PADDING, Math.min(left, window.innerWidth - WIDTH - PADDING));

        // 상하 위치 계산
        const showBelow = position.y - GAP < PADDING + MIN_TOP_SPACE;
        const top = showBelow
            ? position.y + position.height + GAP
            : position.y - GAP;

        // 화살표 위치 계산
        const arrowLeft = Math.min(
            Math.max(position.x - left, ARROW_EDGE_MARGIN),
            WIDTH - ARROW_EDGE_MARGIN
        );

        return {
            left: `${left}px`,
            top: `${top}px`,
            showBelow,
            arrowLeft: `${arrowLeft}px`,
        };
    }, [position]);

    // 화살표 스타일
    const arrowStyle = useMemo(() => {
        const {ARROW_SIZE, BG_COLOR} = TOOLTIP_CONFIG;
        const baseStyle = {
            left: tooltipStyle.arrowLeft,
            transform: "translateX(-50%)",
            borderLeft: `${ARROW_SIZE}px solid transparent`,
            borderRight: `${ARROW_SIZE}px solid transparent`,
        };

        return tooltipStyle.showBelow
            ? {...baseStyle, top: `-${ARROW_SIZE}px`, borderBottom: `${ARROW_SIZE}px solid ${BG_COLOR}`}
            : {...baseStyle, bottom: `-${ARROW_SIZE}px`, borderTop: `${ARROW_SIZE}px solid ${BG_COLOR}`};
    }, [tooltipStyle]);

    return (
        <div
            className="fixed z-50 keyword-tooltip"
            style={{
                left: tooltipStyle.left,
                top: tooltipStyle.top,
                transform: tooltipStyle.showBelow ? "translateY(0)" : "translateY(-100%)",
            }}
        >
            {/* 화살표 */}
            <div className="absolute w-0 h-0" style={arrowStyle}/>

            {/* 툴팁 본체 */}
            <div
                className="w-[320px] rounded-[20px] shadow-2xl px-5 py-4"
                style={{backgroundColor: TOOLTIP_CONFIG.BG_COLOR}}
            >
                <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{TOOLTIP_CONFIG.ICON}</span>
                        <h4
                            className="font-semibold break-words"
                            style={{color: TOOLTIP_CONFIG.TEXT_COLOR}}
                        >
                            {keyword}
                        </h4>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1"
                        aria-label="close"
                    >
                        <XMarkIcon className="w-4 h-4"/>
                    </button>
                </div>

                {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-gray-300 py-2">
                        <div
                            className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"/>
                        설명을 불러오는 중...
                    </div>
                )}

                {error && (
                    <p className="text-sm text-gray-300 py-2">
                        설명을 불러올 수 없습니다.
                    </p>
                )}

                {!isLoading && !error && data && (
                    <p
                        className="text-sm whitespace-pre-wrap break-words leading-relaxed"
                        style={{color: TOOLTIP_CONFIG.TEXT_COLOR}}
                    >
                        {data.description}
                    </p>
                )}
            </div>
        </div>
    );
}

export default memo(KeywordTooltip);