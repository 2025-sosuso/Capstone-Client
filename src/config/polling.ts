export const POLLING_CONFIG = {
    // 여러 영상 폴링 (검색, 메인, 스크랩 등)
    list: {
        initialDelay: 40000,
        interval: 5000,
        maxRetries: 17,
        maxConcurrent: 3,
    },

    // 상세 페이지 폴링 (한 영상)
    detail: {
        initialDelay: 40000,
        interval: 5000,
        maxRetries: 19,
    },

    // 영상 처리 대기 (404 재시도)
    processing: {
        initialDelay: 40000,
        interval: 5000,
        maxRetries: 17,
    },
} as const;