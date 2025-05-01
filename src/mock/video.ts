import { VideoData } from '@/types/video';

export const mockVideoData: VideoData = {
    id: 'IbxI43fHWnk',
    title: '📌 찰승현스위스 🇨🇭 여행 브이로그!!!',
/*   thumbnailUrl: '/thumbnails/video-001.png', */
    channel: {
        name: '찰스엔터',
/*      profileImageUrl: '/profiles/charles.png',*/
        subscriberCount: '65.2만 명',
    },
    stats: {
        views: 525971,
        uploadedAt: '23시간 전',
        likes: 18000,
        commentsCount: 2206,
    },
    aiSummary: {
        summaryText: '송현서 개웃김 ㅋㅋ',
        likeCount: 127,
    },
    emotionRatio: {
        positive: 48,
        negative: 26,
        etc: 26,
    },
    popularComments: [
        {
            id: 'cmt-001',
            author: '차유채',
            content: 'ㅋㅋ개꿀잼',
            date: '1개월 전',
            likeCount: 101,
        },
        {
            id: 'cmt-002',
            author: '강예린',
            content: '의외로 진지해요',
            date: '3일 전',
            likeCount: 57,
        },
        {
            id: 'cmt-003',
            author: '이소현',
            content: '송현서님사랑합니다',
            date: '5일 전',
            likeCount: 46,
        },
        {
            id: 'cmt-004',
            author: 'kyer55',
            content: '깔끔',
            date: '1주 전',
            likeCount: 44,
        },
        {
            id: 'cmt-005',
            author: 'fingertime',
            content: '다음편내놔',
            date: '2일 전',
            likeCount: 2,
        },
    ],
    allComments: [], // (필요시 페이징 또는 별도 fetch 처리)
    keywordSummary: ['할스엔터', '송현서', '스위스', '여행', '재미'],
    topKeywords: {
        '송현서': [
            {
                id: 'cmt-003',
                author: '이소현',
                content: '송현서님사랑합니다',
                date: '5일 전',
                likeCount: 46,
            },
            {
                id: 'cmt-006',
                author: '하율',
                content: '송현서가 웃김ㅋㅋ',
                date: '2일 전',
                likeCount: 20,
            },
        ],
        '스위스': [
            {
                id: 'cmt-007',
                author: '해외여행러',
                content: '스위스 진짜 멋지다',
                date: '1일 전',
                likeCount: 15,
            },
        ],
    },
    languageRatio: {
        ko: 60,
        en: 20,
        ja: 10,
        zh: 5,
        etc: 5,
    },
    highlightTimestamps: ['01:00:36', '53:11', '21:51', '02:03', '02:01'],
    commentTimestamps: [
        { time: '00:00', count: 0 },
        { time: '00:10', count: 20 },
        { time: '00:20', count: 55 },
        { time: '00:30', count: 40 },
        { time: '00:40', count: 35 },
        { time: '00:50', count: 30 },
        { time: '01:00', count: 18 },
    ],
};
