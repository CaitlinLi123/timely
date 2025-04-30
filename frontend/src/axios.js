import axios from "axios";

export const authApi = axios.create({
    baseURL: "http://localhost/api/auth",
    withCredentials: true
});

export const todoApi = axios.create({
    baseURL: "http://localhost/api/task",
    withCredentials: true
});

export const labelApi = axios.create({
    baseURL: "http://localhost/api/label",
    withCredentials: true
})

export default axios;