import { DI_TYPES } from "@/core/types";
import { ISurveyModel } from "@/models/survey.model";
import { ISurveyRepository } from "@/repositories/interface/ISurveyRepository";
import { inject, injectable } from "inversify";
import { ISurvey } from "shared/types";
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
            throw createHttpError(HttpStatus.CONFLICT, HttpResponse.SURVEY_ALREADY_EXISTS);
        }
        return await this._surveyRepository.createSurvey(data);
    }
}