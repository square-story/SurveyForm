import { axiosInstance } from "@/api";
import { TokenUtils } from "@/utils/tokenUtils";
import { env } from "@/config/env";
import type { AuthResponse, LoginData } from "./interfaces";
import type { AxiosResponse } from "axios";
import { extractAxiosErrorMessage } from "@/utils/errorMessage";

export const AuthService = {
    async login(data: LoginData): Promise<AxiosResponse<AuthResponse>> {
        try {
            const response: AxiosResponse<AuthResponse> = await axiosInstance.post(`${env.API_URL}/auth/login`, data);
            TokenUtils.setToken(response.data.token);
            return response;
        } catch (error: unknown) {
            const errorMessage = extractAxiosErrorMessage(error, "Login failed. Please try again.");
            throw new Error(errorMessage);
        }
    },

    async logout(): Promise<void> {
        try {
            await axiosInstance.post(`${env.API_URL}/auth/logout`);
            TokenUtils.removeToken();
        } catch (error) {
            const errorMessage = extractAxiosErrorMessage(error, "Logout failed. Please try again.");
            throw new Error(errorMessage);
        }
    },
}