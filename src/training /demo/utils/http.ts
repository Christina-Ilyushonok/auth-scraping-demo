import axios from "axios";

export const api = axios.create();

api.interceptors.request.use((config) => {
  console.log("req", config.method?.toUpperCase(), config.url);
  return config;
});

api.interceptors.response.use((res) => {
  console.log("res", res.status, res.config.url);
  return res;
});