import axios from "axios";

export const authApi = axios.create({
    baseURL: "/auth/api",
    withCredentials: true
});

export const todoApi = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
});

export default axios;