import mongoose from "mongoose";
import { appConfig } from "./app.config";

const dbConfig = {
    uri: appConfig.mongoUri,
};

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbConfig.uri);
        console.log("Connected to MongoDB ✅");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
};