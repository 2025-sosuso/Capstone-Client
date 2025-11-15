'use client';

import {useState, useCallback} from 'react';
import SentimentItem from './SentimentItem';
import {SentimentRatio} from '@/types/video.types';
import EmptyState from "@components/common/EmptyState";

type SentimentType = 'positive' | 'negative' | 'other';

interface SentimentBarProps {
    ratio?: SentimentRatio;
    size?: 'sm' | 'md';
    onClick?: (sentiment: SentimentType) => void;
    isLoading?: boolean;
}

const COLORS = {
    positive: {
        text: 'text-blue-500',
        bg: 'bg-blue-50',
        hoverBg: 'hover:bg-blue-100/90',
        label: '긍정',
    },
    negative: {
        text: 'text-red-500',
        bg: 'bg-red-50',
        hoverBg: 'hover:bg-red-100/70',
        label: '부정',
    },
    other: {
        text: 'text-gray-500',
        bg: 'bg-gray-50',
        hoverBg: 'hover:bg-gray-200/70',
        label: '기타',
    },
} as const;

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

export default function SentimentBar({ratio, size = 'md', onClick, isLoading = false}: SentimentBarProps) {
    const [hoveredKey, setHoveredKey] = useState<SentimentType | null>(null);

    const handleClick = useCallback((sentiment: SentimentType) => {
        if (onClick) {
            onClick(sentiment);
        }
    }, [onClick]);

    const hasValidData =
        ratio &&
        Object.values(ratio).some((v) => typeof v === 'number' && v > 0);

    if (isLoading) {
        return <EmptyState message="감정 분석 중입니다" variant="loading" />;
    }

    if (!hasValidData) {
        return <EmptyState message="감정 분석 데이터가 없습니다." />;
    }

    return (
        <div className="flex w-full gap-2 items-center">
            <div className="flex items-center w-full overflow-hidden rounded-full">
                {Object.entries(ratio).map(([key, value]) => {
                    const sentimentKey = key as SentimentType;
                    const percent = clampPercent(value);
                    const isHovered = hoveredKey === sentimentKey;
                    const colorSet = COLORS[sentimentKey];

                    if (!colorSet) return null;

                    const {text, bg, hoverBg, label} = colorSet;

                    return (
                        <SentimentItem
                            key={sentimentKey}
                            sentiment={sentimentKey}
                            label={label}
                            percent={percent}
                            isHovered={isHovered}
                            text={text}
                            bg={bg}
                            hoverBg={hoverBg}
                            size={size}
                            onClick={handleClick}
                            onHover={setHoveredKey}
                        />
                    );
                })}
            </div>
        </div>
    );
}