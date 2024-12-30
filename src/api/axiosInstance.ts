import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Add a request interceptor to include the token only when required
axiosInstance.interceptors.request.use(
    async (config) => {
        if (config.requiresAuth) {
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle errors globally (e.g., refresh token)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.log('Unauthorized error - Attempting token refresh.');

            const originalRequest = error.config;

            if (originalRequest._retry) {
                console.log('Token refresh already attempted, redirecting to login.');
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (!refreshToken) {
                    console.log('No refresh token found. Redirecting to login.');
                    return Promise.reject(error);
                }

                const response = await axios.post('http://192.168.0.200:8000/api/auth/refresh/', {
                    refresh: refreshToken,
                });
                const newAccessToken = response.data.access;

                await AsyncStorage.setItem('accessToken', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;