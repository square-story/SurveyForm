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
    findAllSurveys = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { page, limit, sortBy, sortOrder, search, status } = req.query;
            const surveys = await this._surveyService.findAllSurveys({
                page: Number(page) || 1,
                limit: Number(limit) || 10,
                sortBy: sortBy as string | undefined || "createdAt",
                sortOrder: sortOrder as "asc" | "desc" | undefined || "desc",
                search: search as string | undefined,
                status: status as "new" | "reviewed" | "archived" | undefined
            });
            res.status(HttpStatus.OK).json({
                data: surveys.data,
                meta: surveys.meta,
            });
        } catch (error) {
            next(error);
        }
    }
    getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await this._surveyService.getStats();
            res.status(HttpStatus.OK).json(stats);
        } catch (error) {
            next(error);
        }
    }
    updateSurveyStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedSurvey = await this._surveyService.updateSurveyStatus(id, status);
            res.status(HttpStatus.OK).json({ survey: updatedSurvey, message: HttpResponse.SURVEY_STATUS_UPDATED });
        } catch (error) {
            next(error);
        }
    }
    deleteSurvey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            await this._surveyService.deleteSurvey(id);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }
    bulkDeleteSurveys = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { ids } = req.body;
            if (!Array.isArray(ids) || ids.length === 0) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: HttpResponse.INVALID_IDS });
                return;
            }
            await this._surveyService.bulkDeleteSurveys(ids);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }
    bulkUpdateSurveys = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { ids, status } = req.body;
            if (!Array.isArray(ids) || ids.length === 0) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: HttpResponse.INVALID_IDS });
                return;
            }
            await this._surveyService.bulkUpdateSurveysStatus(ids, status);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }
}