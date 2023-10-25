import axios from 'axios';

const axiosInstance = axios.create({
    // api url from .env file
    baseURL: import.meta.env.VITE_API_URL,
    // enable loading images and icons
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;