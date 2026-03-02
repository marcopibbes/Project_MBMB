import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8080/api/users";
const TOKEN_KEY = "jwtToken";



export const login = (credentials) => {
    return axios.post("http://localhost:8080/api/users/login", credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
    return !!getToken();
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};
