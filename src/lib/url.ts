function normalizeBase(url?: string): string | null {
    if (!url) return null;
    const trimmed = url.replace(/\/+$/, '');
    if (!/^https?:\/\//.test(trimmed)) return null;
    return trimmed;
}

export function getApiBaseUrl(): string {
    return normalizeBase(process.env.NEXT_PUBLIC_API_BASE_URL) ?? 'https://knu-sosuso.com';
}

export function getBaseUrl(): string {
    // 1순위: env
    const fromEnv = normalizeBase(process.env.NEXT_PUBLIC_BASE_URL);
    if (fromEnv) return fromEnv;

    // 2순위: 브라우저 현재 origin
    if (typeof window !== 'undefined' && window.location?.origin) {
        return window.location.origin;
    }

    // 3순위: 안전 기본값
    return 'https://sosuso-client.vercel.app';
}

export const LOGIN_SUCCESS_PATH = '/login/success';

export function buildRedirectUri() {
    return `${getBaseUrl()}${LOGIN_SUCCESS_PATH}`;
}
