import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
);
console.log(`Environment variables loaded from ${envPath} and NODE_ENV is ${process.env.NODE_ENV}`);
dotenv.config({ path: envPath });

interface IAppConfig {
    port: number;
    host: string;
    env: string;
    corsOrigin: string;
    corsCredentials: boolean;
    mongoUri: string;
    accessToken: string;
    refreshToken: string;
}

export const appConfig: IAppConfig = {
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    corsCredentials: process.env.CORS_CREDENTIALS === 'true',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/SurveyApp',
    accessToken: process.env.JWT_ACCESS_SECRET || 'something',
    refreshToken: process.env.JWT_REFRESH_SECRET || 'similar'
};
