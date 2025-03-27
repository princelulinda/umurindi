import axios from 'axios';
import { getToken, refreshToken } from './authService';

const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_HOST}`,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    }
});


apiClient.interceptors.request.use(async (config) => {
    const token = await getToken(); 
    if (token) {
        config.headers.Authorization = `JWT ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));


apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshToken();
                if (newToken) {
                    originalRequest.headers.Authorization = `JWT ${newToken}`;
                    return apiClient(originalRequest); 
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                return Promise.reject(refreshError); 
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
