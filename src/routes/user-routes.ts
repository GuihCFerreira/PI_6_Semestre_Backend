import { Router } from "express";
import { validateToken } from "../middleware/validate-token";
import userController from "../controller/user-controller";
import { verifyIdParam } from "../middleware/verify-id-param";

const userRouter = Router();

userRouter.get("/", validateToken, userController.getAllUsers);
userRouter.get("/:id", validateToken, verifyIdParam, userController.getUserById);

export { userRouter };