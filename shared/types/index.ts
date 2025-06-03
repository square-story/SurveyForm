export interface IAdmin {
    _id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type IGender = "male" | "female" | "other" | "prefer-not-to-say"

export interface ISurvey {
    _id: string;
    name: string;
    gender: IGender;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message?: string | undefined;
    status: "new" | "reviewed" | "archived";
    createdAt: Date;
    updatedAt: Date;
}

export interface ISurveyDashboard {
    totalSurveys: number;
    reviewedSurveys: number;
    newSurveys: number;
    totalArchived: number;
}

export interface ISurveyParams {
    page: number;
    limit: number;
    sortBy: string | undefined;
    sortOrder: number | string | undefined;
    search: string | undefined;
    status: "new" | "reviewed" | "archived" | undefined;
}

export interface ISurveyResponse {
    data: ISurvey[];
    meta: {
        totalCount: number;
        pageCount: number;
        currentPage: number;
        perPage: number;
    };
}