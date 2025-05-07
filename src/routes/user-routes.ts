import { Router } from "express";
import userController from "../controller/user-controller";
import { verifyIdParam } from "../middleware/verify-id-param";
import { validateToken } from "../middleware/validate-token";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", verifyIdParam, userController.getUserById);

export { userRouter };