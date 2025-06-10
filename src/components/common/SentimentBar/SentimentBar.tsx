'use client';

import { useState, useCallback } from 'react';
import SentimentItem from './SentimentItem';
import { SentimentRatio } from '@/types/video';

type SentimentType = 'POSITIVE' | 'NEGATIVE' | 'OTHER';

interface SentimentBarProps {
    ratio?: SentimentRatio;
    size?: 'sm' | 'md';
    onClick?: (sentiment: SentimentType) => void;
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

export default function SentimentBar({ ratio, size = 'md', onClick }: SentimentBarProps) {
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);

    const handleClick = useCallback((key: string) => {
        const map: Record<string, SentimentType> = {
            positive: 'POSITIVE',
            negative: 'NEGATIVE',
            other: 'OTHER',
        };
        const sentiment = map[key.toLowerCase()];
        console.log("감정 클릭됨", key, "→", sentiment);

        if (onClick && sentiment) {
            onClick(sentiment);
        }
    }, [onClick]);


    const hasValidData =
        ratio &&
        Object.values(ratio).some((v) => typeof v === 'number' && v > 0);

    if (!hasValidData) {
        return (
            <div className="w-full px-4 py-3 text-center text-sm text-gray-400 bg-gray-50 rounded-xl">
                감정 분석 데이터가 없습니다.
            </div>
        );
    }

    return (
        <div className="flex w-full gap-2 items-center">
            <div className="flex items-center w-full overflow-hidden rounded-full">
                {Object.entries(ratio).map(([key, value]) => {
                    const percent = clampPercent(value);
                    const isHovered = hoveredKey === key;
                    const colorSet = COLORS[key as keyof typeof COLORS];

                    if (!colorSet) return null;

                    const { text, bg, hoverBg, label } = colorSet;

                    return (
                        <SentimentItem
                            key={key}
                            keyName={key}
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
