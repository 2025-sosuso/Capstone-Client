'use client';

import { useCallback, useState } from 'react';

interface Type {
    positive: number;
    negative: number;
    etc: number;
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

interface SegmentProps {
    keyName: string;
    label: string;
    percent: number;
    isHovered: boolean;
    text: string;
    bg: string;
    hoverBg: string;
    onClick: (label: string, percent: number) => void;
    onHover: (key: string | null) => void;
}

function EmotionSegment({
                            keyName,
                            label,
                            percent,
                            isHovered,
                            text,
                            bg,
                            hoverBg,
                            onClick,
                            onHover,
                        }: SegmentProps) {
    const displayWidth = isHovered && percent < 40 ? '50%' : `${percent}%`;
    const shouldShowText = percent >= 10 || isHovered;

    return (
        <span
            className={`
        relative flex items-center min-h-[2.5rem] px-4 py-3
        ${text} ${bg} ${hoverBg} cursor-pointer
        ${isHovered ? 'font-semibold' : ''}
        truncate whitespace-nowrap transition-all duration-300 ease-in-out
      `}
            style={{ width: displayWidth }}
            onClick={() => onClick(label, percent)}
            onMouseEnter={() => onHover(keyName)}
            onMouseLeave={() => onHover(null)}
        >
      {shouldShowText ? `${label} ${percent}%` : ''}
    </span>
    );
}

export default function EmotionBar({ data }: { data: Type }) {
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const onClick = useCallback((label: string, percent: number) => {
        console.log(`${label}: ${percent}%`);
    }, []);

    return (
        <div className="flex gap-2 items-center">
            <div className="flex items-center w-full overflow-hidden rounded-full text-sm">
                {Object.entries(data).map(([key, value]) => {
                    const percent = clampPercent(value);
                    const isHovered = hoveredKey === key;
                    const { text, bg, hoverBg, label } = COLORS[key as keyof Type];

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
                            onClick={onClick}
                            onHover={setHoveredKey}
                        />
                    );
                })}
            </div>
        </div>
    );
}
