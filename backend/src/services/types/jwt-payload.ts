export interface AuthJwtPayload {
    id: string;
    username: string;
    iat?: number;
    exp?: number;
}
