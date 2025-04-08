import { Router } from "express";
import userController from "../controller/user-controller";
import { verifyIdParam } from "../middleware/verify-id-param";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", verifyIdParam, userController.getUserById);

export { userRouter };