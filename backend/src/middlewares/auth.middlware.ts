import { AuthJwtPayload } from "@/types/jwt-payload";
import { verifyAccessToken } from "@/utils";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
    interface Request {
        user?: AuthJwtPayload;
    }
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const payload = verifyAccessToken(token) as AuthJwtPayload;
        if (!payload) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = payload;
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}