import axios from "axios";

export const authApi = axios.create({
    baseURL: "/api/auth",
    withCredentials: true
});

export const todoApi = axios.create({
    baseURL: "/api/task",
    withCredentials: true
});

export const LabelApi = axios.create({
    baseURL: "/api/label",
    withCredentials: true
})

export default axios;