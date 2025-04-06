import { Router } from "express";
import authController from "../controller/auth-controller";
import { validadeInput } from "../middleware/validate-input";
import { createUserSchema, loginUserSchema } from "../schema/auth-schema";

const authRouter = Router();

authRouter.post("/login", validadeInput(loginUserSchema), authController.loginUser);
authRouter.post("/sign-in", validadeInput(createUserSchema), authController.signInUser);

export { authRouter };