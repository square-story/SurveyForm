import { axiosInstance } from "@/api";
import { TokenUtils } from "@/utils/tokenUtils";
import { env } from "@/config/env";
import type { AuthResponse, LoginData } from "./interfaces";
import type { AxiosResponse } from "axios";

export const AuthService = {
    async login(data: LoginData): Promise<AxiosResponse<AuthResponse>> {
        const response = await axiosInstance.post(`${env.API_URL}/auth/login`, data);
        TokenUtils.setToken(response.data.token);
        return response;
    },

    async logout(): Promise<void> {
        await axiosInstance.post(`${env.API_URL}/auth/logout`);
        TokenUtils.removeToken();
    },

    async refreshToken(): Promise<AxiosResponse> {
        return await axiosInstance.post(`${env.API_URL}/auth/refresh-token`);
    }
}