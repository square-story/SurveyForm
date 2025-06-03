import { DI_TYPES } from "@/core/types";
import { ISurveyModel } from "@/models/survey.model";
import { ISurveyRepository } from "@/repositories/interface/ISurveyRepository";
import { inject, injectable } from "inversify";
import { ISurvey, ISurveyParams, ISurveyResponse } from "shared/types";
import { ISurveyService } from "../interface/ISurveyService";
import { HttpResponse, HttpStatus } from "@/constants";
import { createHttpError } from "@/utils";

@injectable()
export class SurveyService implements ISurveyService {
    constructor(
        @inject(DI_TYPES.SurveyRepository) private _surveyRepository: ISurveyRepository
    ) { }

    async findSurveyById(id: string): Promise<ISurveyModel | null> {
        try {
            return await this._surveyRepository.findSurveyById(id);
        } catch (error) {
            console.error(error);
            throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SURVEY_NOT_FOUND);
        }
    }

    async createSurvey(data: ISurvey): Promise<ISurveyModel> {
        const exist = await this._surveyRepository.findSurvey(data)
        if (exist) {
            throw exist.email === data.email ? createHttpError(HttpStatus.CONFLICT, HttpResponse.SURVEY_EMAIL_ALREADY_EXISTS) : createHttpError(HttpStatus.CONFLICT, HttpResponse.SURVEY_PHONE_ALREADY_EXISTS);
        }
        const name = data.name.trim().slice(0, 1).toUpperCase() + data.name.trim().slice(1).toLowerCase();
        return await this._surveyRepository.createSurvey({ ...data, name });
    }

    async findAllSurveys(params: ISurveyParams): Promise<ISurveyResponse> {
        try {
            return await this._surveyRepository.findAllSurveys(params);
        } catch (error) {
            console.error(error);
            throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, HttpResponse.SERVER_ERROR);
        }
    }

    async getStats() {
        try {
            return await this._surveyRepository.getStats();
        } catch (error) {
            console.error(error);
            throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, HttpResponse.SERVER_ERROR);
        }
    }

    async updateSurveyStatus(id: string, status: string): Promise<ISurveyModel> {
        try {
            const survey = await this._surveyRepository.findSurveyById(id);
            if (!survey) {
                throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SURVEY_NOT_FOUND);
            }
            survey.status = status as "new" | "reviewed" | "archived";
            return await survey.save();
        } catch (error) {
            console.error(error);
            throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, HttpResponse.SERVER_ERROR);
        }
    }

    async deleteSurvey(id: string): Promise<void> {
        try {
            const survey = await this._surveyRepository.findSurveyById(id);
            if (!survey) {
                throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SURVEY_NOT_FOUND);
            }
            await this._surveyRepository.deleteSurvey(id);
        } catch (error) {
            console.error(error);
            throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, HttpResponse.SERVER_ERROR);
        }
    }

    async bulkDeleteSurveys(ids: string[]): Promise<void> {
        try {
            for (const id of ids) {
                const survey = await this._surveyRepository.findSurveyById(id);
                if (!survey) {
                    throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SURVEY_NOT_FOUND);
                }
            }
            await Promise.all(ids.map(id => this._surveyRepository.deleteSurvey(id)));
        } catch (error) {
            console.error(error);
            throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, HttpResponse.SERVER_ERROR);
        }
    }
    async bulkUpdateSurveysStatus(ids: string[], status: string): Promise<void> {
        try {
            const surveys = await Promise.all(ids.map(id => this._surveyRepository.findSurveyById(id)));
            for (const survey of surveys) {
                if (!survey) {
                    throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SURVEY_NOT_FOUND);
                }
                survey.status = status as "new" | "reviewed" | "archived";
                await survey.save();
            }
        } catch (error) {
            console.error(error);
            throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, HttpResponse.SERVER_ERROR);
        }
    }
}