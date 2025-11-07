type SentimentType = 'positive' | 'negative' | 'other';

type SentimentItemProps = {
    sentiment: SentimentType;
    label: string;
    percent: number;
    isHovered: boolean;
    text: string;
    bg: string;
    hoverBg: string;
    size: 'sm' | 'md';
    onClick: (sentiment: SentimentType) => void;
    onHover: (sentiment: SentimentType | null) => void;
};

export default function SentimentItem(props: SentimentItemProps) {
    const {
        sentiment,
        label,
        percent,
        isHovered,
        text,
        bg,
        hoverBg,
        size,
        onClick,
        onHover,
    } = props;

    const displayWidth = isHovered && percent < 50 ? '50%' : `${percent}%`;
    const shouldShowText = percent >= 15 || isHovered;

    const sizeClass = size === 'sm'
        ? 'text-xs px-3 py-1 min-h-[2.25rem]'
        : 'text-sm px-4 py-3 min-h-[2.75rem] cursor-pointer';

    return (
        <div
            className={`
                relative flex items-center justify-start truncate whitespace-nowrap
                transition-all duration-300 ease-in-out
                ${text} ${bg} ${hoverBg} ${sizeClass} ${isHovered ? 'font-semibold' : ''}
            `}
            style={{
                width: displayWidth,
                minWidth: shouldShowText ? '3rem' : '0',
            }}
            onClick={() => onClick(sentiment)}
            onMouseEnter={() => onHover(sentiment)}
            onMouseLeave={() => onHover(null)}
        >
            {shouldShowText && `${label} ${percent}%`}
        </div>
    );
}