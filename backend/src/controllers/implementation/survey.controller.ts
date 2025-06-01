import { inject, injectable } from "inversify";
import { ISurveyController } from "../interface/ISurveyController";
import { DI_TYPES } from "@/core/types";
import { ISurveyService } from "@/services/interface/ISurveyService";
import { NextFunction, Request, Response } from "express";
import { HttpResponse, HttpStatus } from "@/constants";

@injectable()
export class SurveyController implements ISurveyController {
    constructor(
        @inject(DI_TYPES.SurveyService) private _surveyService: ISurveyService
    ) { }

    findSurveyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const survey = await this._surveyService.findSurveyById(req.params.id);
            if (!survey) {
                res.status(HttpStatus.NOT_FOUND).json({ message: HttpResponse.SURVEY_NOT_FOUND });
                return;
            }
            res.status(200).json(survey);
        } catch (error) {
            next(error);
        }
    }

    createSurvey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const surveyData = req.body;
            const newSurvey = await this._surveyService.createSurvey(surveyData);
            res.status(HttpStatus.CREATED).json({ survey: newSurvey, message: HttpResponse.SURVEY_CREATION_SUCCESS });
        } catch (error) {
            next(error);
        }
    }
}