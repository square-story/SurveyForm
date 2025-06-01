import { ISurveyModel } from "@/models/survey.model";
import { ISurveyDashboard } from "@/types/ISurveyDashboard";
import { ISurvey } from "shared/types";

export interface ISurveyService {
    findSurveyById(id: string): Promise<ISurveyModel | null>;
    createSurvey(data: ISurvey): Promise<ISurveyModel>;
    findAllSurveys(): Promise<ISurveyModel[]>;
    getStats(): Promise<ISurveyDashboard>;
}