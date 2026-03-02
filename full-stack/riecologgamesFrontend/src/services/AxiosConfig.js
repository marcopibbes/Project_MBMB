import axios from "axios";
import { getToken, logout } from "./AuthService";

axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    }
);

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            logout();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);
