import { Router } from "express";
import { validateToken } from "../middleware/validate-token";
import userController from "../controller/user-controller";
import { verifyIdParam } from "../middleware/verify-id-param";
import { validateImageUpload } from "../middleware/validate-image-upload";

const userRouter = Router();

userRouter.get("/", validateToken, userController.getAllUsers);
userRouter.get("/:id", validateToken, verifyIdParam, userController.getUserById);
userRouter.post("/image", validateToken, validateImageUpload, userController.uploadUserImage);
userRouter.delete("/image", validateToken, userController.deleteUserImage);

export { userRouter };