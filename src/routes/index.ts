import { Router } from "express";
import { authRouter } from "./auth-routes";
import { userRouter } from "./user-routes";
import { validateToken } from "../middleware/validate-token";

const router: Router = Router();

router.use("/", authRouter);
router.use("/user", validateToken, userRouter);

export { router}