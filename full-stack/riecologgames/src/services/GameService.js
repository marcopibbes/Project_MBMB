import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/games";

export const listGames = () => {
    return axios.get(API_BASE_URL);
}