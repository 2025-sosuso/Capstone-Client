import axios from "axios";

const api = axios.create({
    baseURL: "https://knu-sosuso.com/api",
    withCredentials: true,
});

export default api;
