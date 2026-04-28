import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/products";

export const listProducts = () => {
    return axios.get(REST_API_BASE_URL + "/details");
};

export const arrivedProduct = (id) => {
    return axios.put(REST_API_BASE_URL+"/arrived/"+id);
}

export const requestProduct = (id, quantity,storeId) => {
    // 1. Passiamo null come secondo parametro (il Body)
    // 2. Usiamo "params" per generare la query string in modo pulito
    return axios.post(`${REST_API_BASE_URL}/request/${id}`, null, {
        params: {
            quantity: quantity,
            storeId: storeId
        }
    });
};