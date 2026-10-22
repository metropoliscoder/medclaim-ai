import axios from "axios";

const api = axios.create({
  baseURL: "http://13.206.88.121:8000",
  timeout: 30000,
});

export default api;