'use client';

import { useState, useCallback } from 'react';
import EmotionSegment from './EmotionSegment';

interface EmotionBarProps {
    ratio: {
        positive: number;
        negative: number;
        etc: number;
    };
    size?: 'sm' | 'md';
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
    etc: {
        text: 'text-gray-500',
        bg: 'bg-gray-50',
        hoverBg: 'hover:bg-gray-200/70',
        label: '기타',
    },
} as const;

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

export default function EmotionBar({ ratio, size = 'md' }: EmotionBarProps) {
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);

    const handleClick = useCallback((label: string, percent: number) => {
        console.log(`${label}: ${percent}%`);
    }, []);

    return (
        <div className="flex w-full gap-2 items-center">
            <div className="flex items-center w-full overflow-hidden rounded-full">
                {Object.entries(ratio).map(([key, value]) => {
                    const percent = clampPercent(value);
                    const isHovered = hoveredKey === key;
                    const { text, bg, hoverBg, label } = COLORS[key as keyof typeof COLORS];

                    return (
                        <EmotionSegment
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
