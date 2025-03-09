import axios from "axios";
axios.defaults.withCredentials=true;
export const authApi = axios.create({
    baseURL: "http://localhost:5000",
});

export const todoApi = axios.create({
    baseURL: "http://localhost:8080",
});

export default axios;