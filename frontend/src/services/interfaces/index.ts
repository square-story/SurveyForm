import type { SurveyFormData } from "@/components/landing/SurveyForm";

export interface LoginData {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface SurveyResponse {
    message: string;
    survey: SurveyFormData;
}


