import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/users";


export const registerCustomer = (user) => {
    return axios.post(REST_API_BASE_URL+"/register_customer", user);
}
  