import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://192.168.12.22:8000/api',
    responseType:'json',
    withCredentials:true,
});
export default Axios;