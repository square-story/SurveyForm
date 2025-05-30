import "reflect-metadata";
import cors from "cors";
import express from "express";
import { appConfig, connectToDatabase, developmentLogger, errorLogger } from "./configs";
import cookieParser from "cookie-parser";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error.middlware";

const app = express();

app.use(
    cors({
        origin: appConfig.corsOrigin,
        credentials: appConfig.corsCredentials,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(developmentLogger);
app.use(errorLogger);
app.use(cookieParser());


app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    await connectToDatabase();
    app.listen(appConfig.port, () => {
        console.log(`Server is running on port ${appConfig.port}✅`);
    });
}

startServer();