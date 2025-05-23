import { Router } from "express";
import { authRouter } from "./auth-routes";
import { userRouter } from "./user-routes";
import { validateToken } from "../middleware/validate-token";
import { quizRouter } from "./quiz-routes";
import { notFoundRoute } from "../middleware/not-found-route";
import { gamesRouter } from "./games-routes";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const router: Router = Router();

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'docs', 'api.yaml'));

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use("/", authRouter);
router.use("/user", validateToken, userRouter);
router.use("/quiz", validateToken, quizRouter);
router.use("/games", validateToken, gamesRouter);

router.use(notFoundRoute);

export { router}