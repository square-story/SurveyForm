import { HttpResponse, HttpStatus } from "@/constants";
import { AuthJwtPayload } from "@/types/jwt-payload";
import { createHttpError, verifyAccessToken } from "@/utils";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
    interface Request {
        user?: AuthJwtPayload;
    }
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.NO_TOKEN)
    }
    try {
        const payload = verifyAccessToken(token) as AuthJwtPayload;
        if (!payload) {
            throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.NO_TOKEN);
        }

        req.user = payload;
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.UNAUTHORIZED);
    }
}