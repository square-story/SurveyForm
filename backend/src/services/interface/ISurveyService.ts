import { ISurveyModel } from "@/models/survey.model";
import { ISurveyDashboard } from "@/types/ISurveyDashboard";
import { ISurvey, ISurveyParams, ISurveyResponse } from "shared/types";

export interface ISurveyService {
    findSurveyById(id: string): Promise<ISurveyModel | null>;
    createSurvey(data: ISurvey): Promise<ISurveyModel>;
    findAllSurveys(params: ISurveyParams): Promise<ISurveyResponse>;
    getStats(): Promise<ISurveyDashboard>;
    updateSurveyStatus(id: string, status: string): Promise<ISurveyModel>;
    deleteSurvey(id: string): Promise<void>;
    bulkDeleteSurveys(ids: string[]): Promise<void>;
    bulkUpdateSurveysStatus(ids: string[], status: string): Promise<void>;
}