import axios from "axios";

const BASE_URL = "https://localhost:7288/api"; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 2000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;