import {VideoSummaryItem} from "@/types/video-summary";

export const mockVideoSummaryList: VideoSummaryItem[] = [
    {
        video: {
            id: "iPgt1tDN_So",
            title: "생후 20일차의 개꿀 빠는 일상",
            description: "즐겁게 시청해주세요♥",
            publishedAt: "2025-05-11T09:45:02Z",
            thumbnailUrl: "https://i.ytimg.com/vi/1-Eoh4q938s/hq720.jpg",
            viewCount: 1000602,
            likeCount: 16824,
            commentCount: 692,
            scrapId: null
        },
        channel: {
            id: "UC-IYpdOqjkER7B6cnChwlhA",
            title: "소녀의행성 Girlsplanet",
            thumbnailUrl: "",
            subscriberCount: 1010000,
        },
        analysis: {
            summary: "강아지 귀엽고 행복한 영상",
            sentimentDistribution: {positive: 30, negative: 20, other: 50},
            keywords: ["강아지", "리트리버", "귀여움"],
            topComments: [
                {
                    id: "cmt001",
                    author: "@로하-c6p",
                    text: "썸네일 미친 너무너무 귀여워😍",
                    likeCount: 1572,
                    sentiment: "positive",
                    publishedAt: "2025-05-11T09:46:09Z"
                },
                {
                    id: "cmt002",
                    author: "@user-mini0",
                    text: "아 목덜미 잡히는거 왜케 귀여움 ㅋㅋㅋ 하찮닼ㅋㅋㅋ",
                    likeCount: 535,
                    sentiment: "other",
                    publishedAt: "2025-05-11T09:51:33Z"
                },
                {
                    id: "cmt003",
                    author: "@Sia272",
                    text: "하루에 다섯번  새벽에도 일어나셔서 젖먹이고 배변시키고 ... 고생이 많으십니다.  정말 경의를 표합니다 👍",
                    likeCount: 457,
                    sentiment: "negative",
                    publishedAt: "2025-05-11T09:54:37Z"
                },
            ],
        }
    },
    {
        video: {
            id: "abc123def",
            title: "고양이의 하루 밀착 관찰 브이로그",
            description: "고양이와의 힐링 일상",
            publishedAt: "2025-05-29T12:22:10Z",
            thumbnailUrl: "https://i.ytimg.com/vi/YJBRUyia1DQ/hq720.jpg",
            viewCount: 502301,
            likeCount: 9521,
            commentCount: 341,
            scrapId: null
        },
        channel: {
            id: "UC-CATVlogChannel",
            title: "냥이네 브이로그",
            thumbnailUrl: "",
            subscriberCount: 512000,
        },
        analysis: {
            summary: "고양이의 일상이 귀엽고 힐링된다",
            sentimentDistribution: {positive: 25, negative: 55, other: 20},
            keywords: ["고양이", "브이로그", "장난감"]
        }
    },
    {
        video: {
            id: "xyz789ghi",
            title: "도베르만 훈련 브이로그｜포효하는 훈련소",
            description: "강아지 훈련 과정 밀착 공개",
            publishedAt: "2025-05-20T17:35:42Z",
            thumbnailUrl: "https://i.ytimg.com/vi/9Zn0Njtx4J8/hq720.jpg",
            viewCount: 845102,
            likeCount: 13421,
            commentCount: 562,
            scrapId: null
        },
        channel: {
            id: "UC-DogTraining",
            title: "멍스타 훈련소",
            thumbnailUrl: "",
            subscriberCount: 874000,
        },
        analysis: {
            summary: "도베르만의 강렬한 훈련 영상",
            sentimentDistribution: {positive: 65, negative: 25, other: 10},
            keywords: ["도베르만", "훈련", "군견"]
        }
    },
    {
        video: {
            id: "qwe456rty",
            title: "치와와의 분노｜소형견 대폭발",
            description: "소형견의 치명적인 귀여움",
            publishedAt: "2025-04-15T08:11:00Z",
            thumbnailUrl: "",
            viewCount: 231401,
            likeCount: 7341,
            commentCount: 128,
            scrapId: null
        },
        channel: {
            id: "UC-ChihuahuaTime",
            title: "찌와와의 시간",
            thumbnailUrl: "",
            subscriberCount: 302000,
        },
        analysis: {
            summary: "치와와의 분노를 유쾌하게 표현한 영상",
            sentimentDistribution: {positive: 55, negative: 3, other: 15},
            keywords: ["치와와", "짖는개", "소형견"]
        }
    },
    {
        video: {
            id: "uio987lkj",
            title: "물개처럼 구르는 골든 리트리버",
            description: "골든 리트리버의 개구진 하루",
            publishedAt: "2025-03-03T21:09:55Z",
            thumbnailUrl: "",
            viewCount: 1189233,
            likeCount: 18234,
            commentCount: 740,
            scrapId: null
        },
        channel: {
            id: "UC-GoldenDogDaily",
            title: "골든데일리",
            thumbnailUrl: "",
            subscriberCount: 1320000,
        },
        analysis: {
            summary: "골든 리트리버의 귀여운 장난감 놀이 영상",
            sentimentDistribution: {positive: 30, negative: 23, other: 47},
            keywords: ["골든리트리버", "물개", "댕댕이"]
        }
    }
];