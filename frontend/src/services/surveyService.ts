import axiosInstance from "@/api";
import type { SurveyFormData } from "@/components/landing/SurveyForm";
import { extractAxiosErrorMessage } from "@/utils/errorMessage";
import type { SurveyResponse } from "./interfaces";
import type { AxiosResponse } from "axios";
import type { ISurveyDashboard, ISurveyParams, ISurveyResponse } from "shared/types";

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
    findAllSurveys: async (params: ISurveyParams) => {
        try {
            const response: AxiosResponse<ISurveyResponse> = await axiosInstance.get("/surveys", { params });
            console.log("Response from findAllSurveys:", response.data.meta);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = extractAxiosErrorMessage(error, "Error fetching all surveys. Please try again.");
            throw new Error(errorMessage);
        }
    },
    getStats: async (): Promise<AxiosResponse<ISurveyDashboard>> => {
        try {
            const response = await axiosInstance.get("/surveys/stats");
            return response;
        } catch (error: unknown) {
            const errorMessage = extractAxiosErrorMessage(error, "Error fetching survey statistics. Please try again.");
            throw new Error(errorMessage);
        }
    },
    updateSurveyStatus: async (id: string, status: string): Promise<AxiosResponse<SurveyResponse>> => {
        try {
            const response = await axiosInstance.patch(`/surveys/${id}/status`, { status });
            return response;
        } catch (error: unknown) {
            const errorMessage = extractAxiosErrorMessage(error, "Error updating survey status. Please try again.");
            throw new Error(errorMessage);
        }
    },
    deleteSurvey: async (id: string): Promise<AxiosResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/surveys/${id}`);
            return response;
        } catch (error: unknown) {
            const errorMessage = extractAxiosErrorMessage(error, "Error deleting survey. Please try again.");
            throw new Error(errorMessage);
        }
    },
    bulkDeleteSurveys: async (ids: string[]): Promise<AxiosResponse<void>> => {
        try {
            const response = await axiosInstance.delete("/surveys/bulk", { data: { ids } });
            return response;
        } catch (error: unknown) {
            const errorMessage = extractAxiosErrorMessage(error, "Error bulk deleting surveys. Please try again.");
            throw new Error(errorMessage);
        }
    },
    bulkUpdateSurveys: async (ids: string[], status: string): Promise<AxiosResponse<void>> => {
        try {
            const response = await axiosInstance.patch("/surveys/bulk", { ids, status });
            return response;
        } catch (error: unknown) {
            const errorMessage = extractAxiosErrorMessage(error, "Error bulk updating surveys. Please try again.");
            throw new Error(errorMessage);
        }
    }
};
