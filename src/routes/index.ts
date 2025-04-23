import { Router } from "express";
import { authRouter } from "./auth-routes";
import { userRouter } from "./user-routes";
import { validateToken } from "../middleware/validate-token";
import { quizRouter } from "./quiz-router";
import { notFoundRoute } from "../middleware/not-found-route";

const router: Router = Router();

router.use("/", authRouter);
router.use("/user", validateToken, userRouter);
router.use("/quiz", validateToken, quizRouter);

router.use(notFoundRoute);

export { router}