import axios from 'axios';
import { getApiBaseUrl } from '@/lib/url';

const api = axios.create({
    baseURL: `${getApiBaseUrl()}/api`,
    withCredentials: true,
});

export default api;
