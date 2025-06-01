import { ISurveyModel } from "@/models/survey.model";

export interface ISurveyDashboard {
    totalSurveys: number;
    reviewedSurveys: number;
    newSurveys: number;
    totalArchived: number;
    surveys: ISurveyModel[];
}
