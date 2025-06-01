import { ISurveyModel } from "@/models/survey.model";
import { ISurvey } from "shared/types";

export interface ISurveyService {
    findSurveyById(id: string): Promise<ISurveyModel | null>;
    createSurvey(data: ISurvey): Promise<ISurveyModel>;
}