export const CARD_COLORS = {
    main: "bg-gray-100",
    hover: "hover:bg-gray-200/80",
    groupHover: "group-hover:bg-gray-200/80",
    blank: "bg-white",
} as const;

export const SENTIMENT_LABEL = {
    POSITIVE: {text: "긍정", color: "bg-blue-100 text-blue-600"},
    NEGATIVE: {text: "부정", color: "bg-red-100 text-red-600"},
    OTHER: {text: "기타", color: "bg-gray-200 text-gray-600"},
} as const;

export const DETAIL_SENTIMENTS_MAP: Record<string, { text: string; color: string }> = {
    JOY: {text: "기쁨", color: "bg-yellow-50 text-yellow-600 border border-yellow-300"},
    LOVE: {text: "사랑", color: "bg-rose-50 text-rose-600 border border-rose-300"},
    GRATITUDE: {text: "감사", color: "bg-emerald-50 text-emerald-600 border border-emerald-300"},
    ANGER: {text: "분노", color: "bg-red-50 text-red-600 border border-red-300"},
    SADNESS: {text: "슬픔", color: "bg-indigo-50 text-indigo-600 border border-indigo-300"},
    FEAR: {text: "두려움", color: "bg-purple-50 text-purple-600 border border-purple-300"},
    NEUTRAL: {text: "중립", color: "bg-gray-50 text-gray-500 border border-gray-300"},
};