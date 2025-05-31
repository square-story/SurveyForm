import axios from 'axios';
import { env } from "../config/env"
import { TokenUtils } from '@/utils/tokenUtils';

const BASE_URL = env.API_URL;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = TokenUtils.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await axiosInstance.post('/auth/refresh-token', {}, {
                    headers: {
                        Authorization: `Bearer ${TokenUtils.getToken()}`
                    }
                });

                const newAccessToken = data.accessToken;

                if (!newAccessToken) {
                    console.log("No new access token")
                    return Promise.reject(error);
                }

                TokenUtils.setToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log("Token refresh failed", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

