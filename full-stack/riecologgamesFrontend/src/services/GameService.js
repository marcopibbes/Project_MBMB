import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/games";

export const listGames =  () => {
    return axios.get(REST_API_BASE_URL);
}

export const createGame = (game) => {
    return axios.post(REST_API_BASE_URL+"/create", game);
}
  