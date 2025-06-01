import { ISurveyController } from "@/controllers/interface/ISurveyController";
import { container } from "@/core/container";
import { DI_TYPES } from "@/core/types";
import { validate } from "@/middlewares/validate.middleware";
import { surveySchema } from "@/schema/survey.schema";
import { Router } from "express";

const surveyRouter = Router();
const surveyController = container.get<ISurveyController>(DI_TYPES.SurveyController);

surveyRouter.get("/stats", surveyController.getStats);
surveyRouter.get("/", surveyController.findAllSurveys);
surveyRouter.get("/:id", surveyController.findSurveyById);
surveyRouter.post("/", validate(surveySchema), surveyController.createSurvey);

export { surveyRouter };