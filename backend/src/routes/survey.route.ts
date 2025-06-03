import { ISurveyController } from "@/controllers/interface/ISurveyController";
import { container } from "@/core/container";
import { DI_TYPES } from "@/core/types";
import { validate } from "@/middlewares/validate.middleware";
import { surveySchema } from "@/schema/survey.schema";
import { Router } from "express";

const surveyRouter = Router();
const surveyController = container.get<ISurveyController>(DI_TYPES.SurveyController);

surveyRouter.get("/stats", surveyController.getStats);
surveyRouter.delete("/bulk", surveyController.bulkDeleteSurveys);
surveyRouter.get("/", surveyController.findAllSurveys);
surveyRouter.get("/:id", surveyController.findSurveyById);
surveyRouter.post("/", validate(surveySchema), surveyController.createSurvey);
surveyRouter.patch("/:id/status", surveyController.updateSurveyStatus);
surveyRouter.delete("/:id", surveyController.deleteSurvey);
surveyRouter.patch('/bulk', surveyController.bulkUpdateSurveys);

export { surveyRouter };