import { Request, Response, NextFunction } from "express";

export interface ISurveyController {
    findSurveyById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createSurvey: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findAllSurveys: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getStats: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
