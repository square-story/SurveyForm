import { ISurveyModel, Survey } from "@/models/survey.model";
import { BaseRepository } from "../base.repository";
import { toObjectId } from "@/utils";
import { ISurvey } from "shared/types";
import { ISurveyRepository } from "../interface/ISurveyRepository";
import { ISurveyDashboard } from "@/types/ISurveyDashboard";

export class SurveyRepository extends BaseRepository<ISurveyModel> implements ISurveyRepository {
    constructor() {
        super(Survey);
    }

    async findSurveyById(id: string): Promise<ISurveyModel | null> {
        try {
            return await this.findById(toObjectId(id));
        } catch (error) {
            console.error(error);
            throw new Error("Error finding survey by ID");
        }
    }

    async createSurvey(data: ISurvey): Promise<ISurveyModel> {
        try {
            const survey = new Survey(data);
            return await survey.save();
        } catch (error) {
            console.error(error);
            throw new Error("Error creating survey");
        }
    }

    async findSurvey(data: ISurvey): Promise<ISurveyModel | null> {
        try {
            return await this.findOne({
                $or: [
                    { email: data.email },
                    { phone: data.phone }
                ]
            });
        } catch (error) {
            console.error(error);
            throw new Error("Error finding survey");
        }
    }

    async findAllSurveys(): Promise<ISurveyModel[]> {
        try {
            return await this.find({});
        } catch (error) {
            console.error(error);
            throw new Error("Error finding all surveys");
        }
    }

    async getStats(): Promise<ISurveyDashboard> {
        try {
            console.log("Fetching survey statistics...");
            const totalSurveys = await this.countDocuments({});
            const reviewedSurveys = await this.countDocuments({ status: "reviewed" });
            const newSurveys = await this.countDocuments({ status: "new" });
            const totalArchived = await this.countDocuments({ status: "archived" });
            const surveys = await this.findAll();

            return {
                totalSurveys,
                reviewedSurveys,
                newSurveys,
                totalArchived,
                surveys
            };
        } catch (error) {
            console.error(error);
            throw new Error("Error getting survey stats");
        }
    }
}
