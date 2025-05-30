import { Container } from "inversify";
import { DI_TYPES } from "./types";
import { AuthController } from "@/controllers/implementation/auth.controller";
import { IAuthController } from "@/controllers/interface/IAuthController";
import { IAuthService } from "@/services/interface/IAuthService";
import { AuthService } from "@/services/implementation/auth.service";
import { IAdminRepository } from "@/repositories/interface/IAdminRepository";
import { AdminRepository } from "@/repositories/implementation/admin.repository";


const container = new Container();

// Controllers
container.bind<IAuthController>(DI_TYPES.AuthController).to(AuthController);

// Services
container.bind<IAuthService>(DI_TYPES.AuthService).to(AuthService);

// Repositories
container.bind<IAdminRepository>(DI_TYPES.AdminRepository).to(AdminRepository);


export { container };