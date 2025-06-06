import { Request, Response, NextFunction } from "express";

export interface ISurveyController {
    findSurveyById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createSurvey: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findAllSurveys: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getStats: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateSurveyStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteSurvey: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    bulkDeleteSurveys: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    bulkUpdateSurveys: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
