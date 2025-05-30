import { inject, injectable } from "inversify";
import { IAuthService } from "../interface/IAuthService";
import { IAdminRepository } from "@/repositories/interface/IAdminRepository";
import { DI_TYPES } from "@/core/types";
import { comparePassword, createHttpError, generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/utils";
import { HttpResponse, HttpStatus } from "@/constants";
import { AuthJwtPayload } from "../types/jwt-payload";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(DI_TYPES.AdminRepository) private _adminRepository: IAdminRepository
    ) { }

    async login(username: string, password: string): Promise<{ refreshToken: string, accessToken: string }> {
        const admin = await this._adminRepository.findByUsername(username);
        if (!admin) {
            throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
        }

        const isPasswordValid = await comparePassword(password, admin.password);
        if (!isPasswordValid) {
            throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.INVALID_CREDENTIALS);
        }

        const payload = { id: admin._id, username: admin.username };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return { accessToken, refreshToken };
    }

    async refreshAccessToken(token: string): Promise<{ accessToken: string, refreshToken: string }> {
        if (!token) {
            throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.NO_TOKEN);
        }
        const decoded = verifyRefreshToken(token) as AuthJwtPayload;
        if (!decoded) {
            throw createHttpError(HttpStatus.NO_CONTENT, HttpResponse.TOKEN_EXPIRED);
        }

        const accessToken = generateAccessToken({ id: decoded.id, username: decoded.username });
        const refreshToken = generateRefreshToken({ id: decoded.id, username: decoded.username });

        return { accessToken, refreshToken };
    }
}
