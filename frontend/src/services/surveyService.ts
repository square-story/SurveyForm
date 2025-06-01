import axiosInstance from "@/api";
import type { SurveyFormData } from "@/components/landing/SurveyForm";
import { extractAxiosErrorMessage } from "@/utils/errorMessage";
import type { SurveyResponse } from "./interfaces";
import type { AxiosResponse } from "axios";

export const surveyService = {
    findSurveyById: async (id: string) => {
        try {
            const response = await axiosInstance.get(`/surveys/${id}`);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = extractAxiosErrorMessage(error, "Error fetching survey by ID. Please try again.");
            throw new Error(errorMessage);
        }
    },
    createSurvey: async (data: SurveyFormData): Promise<AxiosResponse<SurveyResponse>> => {
        try {
            const response = await axiosInstance.post("/surveys", data);
            return response;
        } catch (error: unknown) {
            const errorMessage = extractAxiosErrorMessage(error, "Error creating survey. Please try again.");
            throw new Error(errorMessage);
        }
    },
};
