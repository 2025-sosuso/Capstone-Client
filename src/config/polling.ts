export const POLLING_CONFIG = {
    // 여러 영상 폴링 (검색, 메인, 스크랩 등)
    list: {
        interval: 15000,        // 15초
        maxRetries: 10,         // 10회
        maxConcurrent: 3,       // 동시 3개
    },

    // 상세 페이지 폴링 (한 영상)
    detail: {
        interval: 10000,        // 10초
        maxRetries: 15,         // 15회
    },

    // 영상 처리 대기 (404 재시도)
    processing: {
        interval: 6000,         // 6초
        maxRetries: 24,         // 24회 (총 2.4분)
    },
} as const;