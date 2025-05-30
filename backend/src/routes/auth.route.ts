import { IAuthController } from "@/controllers/interface/IAuthController";
import { container } from "@/core/container";
import { DI_TYPES } from "@/core/types";
import { validate } from "@/middlewares/validate.middleware";
import { signinSchema } from "@/schema/signin.schema";
import { Router } from "express";
const authRouter = Router()

const authController = container.get<IAuthController>(DI_TYPES.AuthController)

authRouter.post("/login", validate(signinSchema), authController.login)
authRouter.post("/logout", authController.logout)
authRouter.post("/refresh-token", authController.refreshToken)

export { authRouter };