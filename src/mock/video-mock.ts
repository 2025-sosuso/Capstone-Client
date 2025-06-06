import { VideoSearchResponse } from "@/types/video";

export const mockVideoResponse: VideoSearchResponse = {
    timeStamp: "2025-05-27T20:51:14.5356819",
    message: "검색이 완료되었습니다.",
    data: {
        searchType: "URL",
        results: [
            {
                video: {
                    id: "ey-6TCSQ5sk",
                    title: "생후 20일차의 개꿀 빠는 일상",
                    description: `즐겁게 시청해주세요♥
-
소행성 팬 가입해주세요🍀 채널 운영에 큰 힘이 됩니다😆
https://www.youtube.com/channel/UC-IYpdOqjkER7B6cnChwlhA/join

소녀스타그램 놀러오세요♥
https://www.instagram.com/minhwa.g/

-
🐇Profile

첫째💕 소녀 | 여아 | 래브라도 리트리버 | 17.02.23
둘째💕 행성 | 여아 | 포메라니안 | 17.10.25
셋째💕 우주 | 여아 | 웰시코기 | 18.5.26

🐇광고문의
girlsplanet_@naver.com

🐶반려동물 입양은 신중하게 생각해주세요🐶

#소녀의행성 #강아지 #dog`,
                    publishedAt: "2025-05-11T09:45:02Z",
                    thumbnailUrl: "",
                    viewCount: 1000602,
                    likeCount: 16824,
                    commentCount: 692,
                    isScrapped: false,
                    scrapId: null
                },
                channel: {
                    id: "UC-IYpdOqjkER7B6cnChwlhA",
                    title: "소녀의행성 Girlsplanet",
                    thumbnailUrl: "",
                    subscriberCount: 1010000,
                    isFavorite: false
                },
                analysis: {
                    summary: "강아지 귀여워",
                    isWarning: false,
                    topComments: [
                        {
                            id: "cmt001",
                            author: "@로하-c6p",
                            text: "썸네일 미친 너무너무 귀여워😍",
                            likeCount: 1572,
                            sentiment: "POSITIVE",
                            publishedAt: "2025-05-11T09:46:09Z"
                        },
                        {
                            id: "cmt002",
                            author: "@user-mini0",
                            text: "아 목덜미 잡히는거 왜케 귀여움 ㅋㅋㅋ 하찮닼ㅋㅋㅋ",
                            likeCount: 535,
                            sentiment: "POSITIVE",
                            publishedAt: "2025-05-11T09:51:33Z"
                        },
                        {
                            id: "cmt003",
                            author: "@Sia272",
                            text: "하루에 다섯번  새벽에도 일어나셔서 젖먹이고 배변시키고 ... 고생이 많으십니다.  정말 경의를 표합니다 👍",
                            likeCount: 457,
                            sentiment: "POSITIVE",
                            publishedAt: "2025-05-11T09:54:37Z"
                        }
                    ],
                    languageDistribution: [
                        { language: "ko", ratio: 0.4 },
                        { language: "en", ratio: 0.1 },
                        { language: "ja", ratio: 0.15 },
                        { language: "zh", ratio: 0.3 },
                        { language: "other", ratio: 0.05 }
                    ],
                    sentimentDistribution: {
                        positive: 61,
                        negative: 34,
                        other: 5
                    },
                    popularTimestamps: [
                        { time: "00:30", mentionCount: 10 },
                        { time: "04:11", mentionCount: 8 },
                        { time: "13:33", mentionCount: 6 },
                        { time: "21:23", mentionCount: 4 },
                        { time: "54:21", mentionCount: 2 }
                    ],
                    commentHistogram: [
                        { hour: "00", count: 30 },
                        { hour: "01", count: 20 },
                        { hour: "02", count: 23324 },
                        { hour: "03", count: 245 },
                        { hour: "04", count: 635 },
                        { hour: "05", count: 3461 }
                    ],
                    keywords: [
                        "retriever",
                        "dog",
                        "puppy",
                        "강아지",
                        "대형견",
                        "소형견",
                        "포메라니안",
                        "웰시코기",
                        "리트리버",
                        "골든리트리버",
                        "댕댕이"
                    ]
                },
                comments: [
                    {
                        id: "cmt001",
                        author: "@로하-c6p",
                        text: "썸네일 미친 너무너무 귀여워😍",
                        likeCount: 1572,
                        sentiment: "POSITIVE",
                        publishedAt: "2025-05-11T09:46:09Z"
                    },
                    {
                        id: "cmt002",
                        author: "@user-mini0",
                        text: "아 목덜미 잡히는거 왜케 귀여움 ㅋㅋㅋ 하찮닼ㅋㅋㅋ",
                        likeCount: 535,
                        sentiment: "POSITIVE",
                        publishedAt: "2025-05-11T09:51:33Z"
                    },
                    {
                        id: "cmt003",
                        author: "@Sia272",
                        text: "하루에 다섯번  새벽에도 일어나셔서 젖먹이고 배변시키고 ... 고생이 많으십니다.  정말 경의를 표합니다 👍",
                        likeCount: 457,
                        sentiment: "POSITIVE",
                        publishedAt: "2025-05-11T09:54:37Z"
                    }
                ]
            }
        ]
    }
};
