type EmotionSegmentProps = {
    keyName: string;
    label: string;
    percent: number;
    isHovered: boolean;
    text: string;
    bg: string;
    hoverBg: string;
    size: 'sm' | 'md';
    onClick: (label: string, percent: number) => void;
    onHover: (key: string | null) => void;
};

export default function EmotionSegment({
                                           keyName,
                                           label,
                                           percent,
                                           isHovered,
                                           text,
                                           bg,
                                           hoverBg,
                                           size,
                                           onClick,
                                           onHover,
                                       }: EmotionSegmentProps) {
    const displayWidth = isHovered && percent < 50 ? '50%' : `${percent}%`;
    const shouldShowText = percent >= 15 || isHovered;

    const sizeStyle =
        size === 'sm'
        ? 'text-xs px-3 py-1 min-h-[2.25rem]'
        : 'text-sm px-4 py-3 min-h-[2.75rem] cursor-pointer';

    return (
        <div
            className={`
        relative flex items-center justify-start
        truncate whitespace-nowrap transition-all duration-300 ease-in-out
        ${text} ${bg} ${hoverBg} ${sizeStyle} ${isHovered ? 'font-semibold' : ''}
      `}
            style={{
                width: displayWidth,
                minWidth: shouldShowText ? '3rem' : '0',
            }}
            onClick={() => onClick(label, percent)}
            onMouseEnter={() => onHover(keyName)}
            onMouseLeave={() => onHover(null)}
        >
            {shouldShowText && `${label} ${percent}%`}
        </div>
    );
}
