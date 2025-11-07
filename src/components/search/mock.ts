// 검색 결과 목 데이터

export const MOCK_CHANNELS = [
    {
        id: "UC_channel_1",
        title: "침착맨",
        handle: "@calmdownman",
        description: "게임, 먹방, 토크 등 다양한 콘텐츠를 제공하는 채널입니다.",
        thumbnailUrl: "https://yt3.ggpht.com/ytc/default.jpg",
        subscriberCount: 1950000,
        favoriteChannelId: null
    },
    {
        id: "UC_channel_2",
        title: "워크맨",
        handle: "@workman",
        description: "직업 체험 예능 콘텐츠를 다루는 채널",
        thumbnailUrl: "https://yt3.ggpht.com/ytc/default.jpg",
        subscriberCount: 3200000,
        favoriteChannelId: null
    },
    {
        id: "UC_channel_3",
        title: "백종원의 요리비책",
        handle: "@paiktv",
        description: "백종원 셰프의 요리 레시피와 먹방 콘텐츠",
        thumbnailUrl: "https://yt3.ggpht.com/ytc/default.jpg",
        subscriberCount: 4500000,
        favoriteChannelId: null
    }
];

export const MOCK_VIDEOS = [
    {
        id: "video_1",
        title: "하루 10분으로 집에서 할 수 있는 전신 운동 루틴",
        thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        channelName: "땅끝헬스",
        viewCount: 1240567,
        likeCount: 45230,
        commentCount: 1280,
        publishedAt: "2일 전",
        sentiment: { positive: 78, negative: 8, other: 14 },
        keywords: ["운동", "홈트", "다이어트"],
        summary: "집에서 쉽게 따라할 수 있는 전신 운동 루틴을 소개합니다. 초보자도 부담없이 시작할 수 있어요."
    },
    {
        id: "video_2",
        title: "직장인을 위한 효율적인 아침 루틴 7가지",
        thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        channelName: "라이프해커",
        viewCount: 890345,
        likeCount: 32100,
        commentCount: 890,
        publishedAt: "5일 전",
        sentiment: { positive: 72, negative: 11, other: 17 },
        keywords: ["루틴", "아침", "생산성"],
        summary: "바쁜 직장인들을 위한 효율적인 아침 루틴을 공유합니다. 시간 관리에 도움이 됩니다."
    },
    {
        id: "video_3",
        title: "초보자도 쉽게 따라하는 파스타 레시피 5분 완성",
        thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        channelName: "쿠킹하루",
        viewCount: 2340128,
        likeCount: 78900,
        commentCount: 2340,
        publishedAt: "1주 전",
        sentiment: { positive: 85, negative: 5, other: 1 },
        keywords: ["요리", "레시피", "파스타"],
        summary: "5분만에 완성하는 간단한 파스타 레시피입니다. 요리 초보자도 실패 없이 만들 수 있어요."
    },
    {
        id: "video_4",
        title: "2025년 꼭 가봐야 할 국내 여행지 TOP 10",
        thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        channelName: "여행스케치",
        viewCount: 1567890,
        likeCount: 56780,
        commentCount: 1890,
        publishedAt: "3일 전",
        sentiment: { positive: 81, negative: 6, other: 13 },
        keywords: ["여행", "국내여행", "추천"],
        summary: "2025년 꼭 방문해야 할 국내 여행지를 소개합니다. 숨은 명소들이 가득해요."
    }
];