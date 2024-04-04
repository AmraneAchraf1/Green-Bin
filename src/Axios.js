import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Accept": "application/json",
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;