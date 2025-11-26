export const SENTIMENT_FLOW_CHART_COLORS = {
    positive: {
        background: 'rgba(59, 130, 246, 0.15)',
        border: 'rgba(59, 130, 246, 0.7)',
    },
    negative: {
        background: 'rgba(239, 68, 68, 0.15)',
        border: 'rgba(239, 68, 68, 0.7)',
    },
    other: {
        background: 'rgba(180,185,195,0.1)',
        border: 'rgba(107, 114, 128, 0.7)',
    },
} as const;

export const SENTIMENT_FLOW_CHART_CONFIG = {
    borderWidth: 1.3,
    tension: 0.4,
    height: 300,
    minY: 0,
    maxY: 100,
} as const;

export const SENTIMENT_BAR_COLORS = {
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

export const LANGUAGE_CHART_COLORS = [
    'rgba(248, 113, 113, 0.7)',  // red-400
    'rgba(251, 146, 60, 0.7)',   // orange-400
    'rgba(74, 222, 128, 0.7)',   // green-400
    'rgba(96, 165, 250, 0.7)',   // blue-400
    'rgba(167, 139, 250, 0.7)',  // violet-400
    'rgba(148, 163, 184, 0.7)',  // slate-400
    'rgba(251, 191, 36, 0.7)',   // amber-400
    'rgba(34, 211, 238, 0.7)',   // cyan-400
    'rgba(56, 189, 248, 0.7)',   // sky-400
    'rgba(244, 114, 182, 0.7)',  // pink-400
] as const;


export const COMMENT_TIME_CHART_COLORS = {
    border: 'rgba(244, 63, 94, 0.7)',
    background: 'rgba(244, 63, 94, 0.25)',
} as const;
