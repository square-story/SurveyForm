import { inject, injectable } from "inversify";
import { IAuthController } from "../interface/IAuthController";
import { DI_TYPES } from "@/core/types";
import { IAuthService } from "@/services/interface/IAuthService";
import { Request, Response, NextFunction } from "express";
import { setCookie } from "@/utils";
import { HttpResponse, HttpStatus } from "@/constants";

@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject(DI_TYPES.AuthService) private _authService: IAuthService
    ) { }

    login: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const { accessToken, refreshToken } = await this._authService.login(username, password);
            setCookie(res, refreshToken);
            res.status(HttpStatus.OK).json({ token: accessToken });
        } catch (error) {
            next(error);
        }
    };

    logout: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (req, res, next) => {
        try {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            res.status(HttpStatus.OK).json({ message: HttpResponse.LOGOUT_SUCCESS });
        } catch (error) {
            next(error);
        }
    };

    refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const { accessToken, refreshToken: newRefreshToken } = await this._authService.refreshAccessToken(refreshToken);
            setCookie(res, newRefreshToken);
            res.status(HttpStatus.OK).json({ token: accessToken });
        } catch (error) {
            next(error);
        }
    };
}