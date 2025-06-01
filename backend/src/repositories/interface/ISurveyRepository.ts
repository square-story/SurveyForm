import { ISurveyModel } from "@/models/survey.model";
import { ISurveyDashboard } from "@/types/ISurveyDashboard";
import { ISurvey } from "shared/types";

export interface ISurveyRepository {
    findSurveyById(id: string): Promise<ISurveyModel | null>;
    createSurvey(data: ISurvey): Promise<ISurveyModel>;
    findSurvey(data: ISurvey): Promise<ISurveyModel | null>;
    findAllSurveys(): Promise<ISurveyModel[]>;
    getStats(): Promise<ISurveyDashboard>;
}