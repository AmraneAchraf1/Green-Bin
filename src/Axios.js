import axios from 'axios'
const baseURL = process.env.REACT_APP_API_URL;
const Axios = axios.create({
    baseURL: baseURL,
    responseType:'json',
    withCredentials:true,
});
export default Axios;