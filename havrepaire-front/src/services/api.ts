import axios from 'axios';

const userToken = localStorage.getItem('authenticatedUser');

const axiosInstance = axios.create({
    // api url from .env file
    baseURL: import.meta.env.VITE_API_URL,
    // enable loading images and icons
    headers: {
        'Authorization': `Bearer ${userToken}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;