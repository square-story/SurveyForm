import { ISurveyModel, Survey } from "@/models/survey.model";
import { BaseRepository } from "../base.repository";
import { toObjectId } from "@/utils";
import { ISurvey, ISurveyParams, ISurveyResponse } from "shared/types";
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

    async findAllSurveys(params: ISurveyParams): Promise<ISurveyResponse> {
        try {
            const { page, limit, sortBy, sortOrder, search, status } = params;
            const query: ISurveyParams = { page, limit, sortBy, sortOrder, search, status };
            if (search) {
                query.search = search.trim();
            }
            const skip = (page - 1) * limit;

            const surveys = await this.model.find({
                status: status || { $exists: true },
                ...(search && {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } },
                        { phone: { $regex: search, $options: "i" } }
                    ]
                })
            })
                .sort({ [sortBy || "createdAt"]: (sortOrder === "asc" ? 1 : sortOrder === "desc" ? -1 : -1) })
                .skip(skip)
                .limit(limit);
            return {
                data: surveys as ISurvey[],
                meta: {
                    totalCount: await this.countDocuments({}),
                    pageCount: Math.ceil(await this.countDocuments({}) / limit),
                    currentPage: page,
                    perPage: limit
                }
            };
        } catch (error) {
            console.error(error);
            throw new Error("Error finding all surveys");
        }
    }

    async getStats(): Promise<ISurveyDashboard> {
        try {
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


