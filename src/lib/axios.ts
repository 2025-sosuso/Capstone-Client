import axios from 'axios';
import {getApiBaseUrl} from '@/lib/url';

const api = axios.create({
    baseURL: `${getApiBaseUrl()}/api`,
    withCredentials: true,
});

let isHandling401 = false;

const PROTECTED_PATHS = [
    '/auth',
    '/scraps',
    '/favorite-channels',
];

const isProtectedPath = (url: string) => {
    return PROTECTED_PATHS.some(path => url.includes(path));
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const requestUrl = error.config?.url || '';

        if (error.response?.status === 401 &&
            isProtectedPath(requestUrl) &&
            !isHandling401) {

            isHandling401 = true;

            localStorage.removeItem('auth');
            window.dispatchEvent(new CustomEvent('auth:session-expired'));

            setTimeout(() => {
                isHandling401 = false;
            }, 1000);
        }

        return Promise.reject(error);
    }
);

export default api;