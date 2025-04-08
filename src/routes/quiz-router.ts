import { Router } from "express";
import quizController from "../controller/quiz-controller";

const quizRouter = Router();

quizRouter.get("/template", quizController.getQuizTemplate);

export { quizRouter };