import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer 1|55el5kQCe827ePi9iNmK6H1jAESt7ZEHM1FJnknm02eb2ff5",
  },
});

export default axiosInstance;
