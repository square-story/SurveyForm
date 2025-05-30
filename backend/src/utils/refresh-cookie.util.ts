import { appConfig } from "@/configs";
import { Response } from "express";

export function setCookie(res: Response, refreshToken: string) {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: appConfig.env === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: appConfig.env === 'production' ? 'none' : 'strict',
    });
}

export function deleteCookie(res: Response) {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: appConfig.env === 'production',
        sameSite: appConfig.env === 'production' ? 'none' : 'strict'
    })
}