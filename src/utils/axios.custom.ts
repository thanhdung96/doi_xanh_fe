import axios from "axios";

export const customAxios = axios.create({
    baseURL: process.env.REACT_APP_WEB_URL,
    responseType: "json"
});
