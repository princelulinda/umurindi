import axios from 'axios';
import { getToken, refreshToken } from './authService';


const apiClient = axios.create({
    baseURL: `https://umulindi.inspirationrdc.com/api/v1`,
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
    console.log("CONFIG", config);
    
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
                console.log("NEW TOKEN", newToken);
                
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
