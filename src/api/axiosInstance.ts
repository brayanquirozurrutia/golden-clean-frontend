import axios from 'axios';

/**
 * Create an axios instance with default base URL and timeout
 */
const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.200:8000/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
