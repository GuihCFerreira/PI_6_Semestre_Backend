import { Router } from "express";
import userController from "../controller/user-controller";
import { verifyIdParam } from "../middleware/verify-id-param";
import { validateToken } from "../middleware/validate-token";

const userRouter = Router();

userRouter.get("/", validateToken, userController.getAllUsers);
userRouter.get("/:id", verifyIdParam, validateToken, userController.getUserById);

export { userRouter };