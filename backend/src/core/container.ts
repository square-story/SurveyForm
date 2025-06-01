import { Container } from "inversify";
import { DI_TYPES } from "./types";
import { AuthController } from "@/controllers/implementation/auth.controller";
import { IAuthController } from "@/controllers/interface/IAuthController";
import { IAuthService } from "@/services/interface/IAuthService";
import { AuthService } from "@/services/implementation/auth.service";
import { IAdminRepository } from "@/repositories/interface/IAdminRepository";
import { AdminRepository } from "@/repositories/implementation/admin.repository";
import { ISurveyRepository } from "@/repositories/interface/ISurveyRepository";
import { SurveyRepository } from "@/repositories/implementation/survey.repository";
import { ISurveyService } from "@/services/interface/ISurveyService";
import { SurveyService } from "@/services/implementation/survey.service";
import { ISurveyController } from "@/controllers/interface/ISurveyController";
import { SurveyController } from "@/controllers/implementation/survey.controller";


const container = new Container();

// Controllers
container.bind<IAuthController>(DI_TYPES.AuthController).to(AuthController);
container.bind<ISurveyController>(DI_TYPES.SurveyController).to(SurveyController);

// Services
container.bind<IAuthService>(DI_TYPES.AuthService).to(AuthService);
container.bind<ISurveyService>(DI_TYPES.SurveyService).to(SurveyService);

// Repositories
container.bind<IAdminRepository>(DI_TYPES.AdminRepository).to(AdminRepository);
container.bind<ISurveyRepository>(DI_TYPES.SurveyRepository).to(SurveyRepository);


export { container };