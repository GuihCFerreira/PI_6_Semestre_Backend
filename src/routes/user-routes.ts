import { Router } from "express";
import userController from "../controller/user-controller";
import { verifyIdParam } from "../middleware/verify-id-param";
import { validateImageUpload } from "../middleware/validate-image-upload";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", verifyIdParam, userController.getUserById);
userRouter.post("/image", validateImageUpload, userController.uploadUserImage);
userRouter.delete("/image", userController.deleteUserImage);

export { userRouter };