import axios from "axios";

export const authApi = axios.create({
    baseURL: "/auth/api",
    withCredentials: true
});

export const todoApi = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true
});

export const LabelApi = axios.create({
    baseURL: "http://localhost:8000/api/label",
    withCredentials: true
})

export default axios;