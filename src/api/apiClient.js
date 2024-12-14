import axios from "axios";

const BASE_URL = "https://localhost:7288/api"; // Asegúrate de usar la URL con /api si configuraste rutas estándar

// Configuración de la instancia de Axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 5 segundos de timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
