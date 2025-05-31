const TOKEN_KEY = "accessToken";
import type { DecodedToken } from "@/types";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

export const TokenUtils = {
    setToken: (token: string, days: number = 7) => {
        Cookies.set(TOKEN_KEY, token, { expires: days, secure: true, sameSite: 'Strict' });
    },
    getToken: (): string | undefined => {
        return Cookies.get(TOKEN_KEY);
    },
    removeToken: (): void => {
        Cookies.remove(TOKEN_KEY);
    }
}

export const decodeToken = (): DecodedToken => {
    const token = TokenUtils.getToken();
    let user: DecodedToken = { id: "", username: "" }
    if (token) {
        try {
            user = jwtDecode<DecodedToken>(token)
        } catch (error) {
            console.error("Failed to decode token:", error)
        }
    }
    return user
}