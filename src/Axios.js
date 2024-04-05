import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Accept": "application/json",
    "Authorization": "Bearer 10|z0kukBkQL8pkr8x4UZ5ofLznvuRqm8D9EGa1QsUac7ad2a61",
  },
});

export default axiosInstance;