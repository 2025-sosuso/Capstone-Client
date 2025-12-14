'use client';

import {useState, useCallback} from 'react';
import SentimentItem from './SentimentItem';
import {SentimentRatio} from '@/types/video.types';
import EmptyState from "@components/ui/EmptyState";
import {SENTIMENT_BAR_COLORS} from "@/config/chart.config";

type SentimentType = 'positive' | 'negative' | 'other';

interface SentimentBarProps {
    ratio?: SentimentRatio;
    size?: 'sm' | 'md';
    onClick?: (sentiment: SentimentType) => void;
    isLoading?: boolean;
}

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
        return <EmptyState message="감정 분석 중입니다" variant="loading"/>;
    }

    if (!hasValidData) {
        return <EmptyState message="감정 분석 데이터가 없습니다."/>;
    }

    return (
        <div className="flex w-full gap-2 items-center">
            <div className="flex items-center w-full overflow-hidden rounded-full">
                {Object.entries(ratio).map(([key, percent]) => {
                    const sentimentKey = key as SentimentType;
                    const isHovered = hoveredKey === sentimentKey;
                    const colorSet = SENTIMENT_BAR_COLORS[sentimentKey];

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