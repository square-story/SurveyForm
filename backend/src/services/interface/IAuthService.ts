export interface IAuthService {
    login(username: string, password: string): Promise<{ refreshToken: string, accessToken: string }>;
    refreshAccessToken(token: string): Promise<{ accessToken: string, refreshToken: string }>;
}
