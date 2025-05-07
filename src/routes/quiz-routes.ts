import { Router } from "express";
import quizController from "../controller/quiz-controller";
import { validateToken } from "../middleware/validate-token";
import { validadeInput } from "../middleware/validate-input";
import { createQuizSchema, updateQuizSchema } from "../schema/quiz-schema";

const quizRouter = Router();

quizRouter.get("/template", quizController.getQuizTemplate);

quizRouter.get("/", validateToken, quizController.getAllQuizzes);
quizRouter.get("/:id", validateToken, quizController.getQuizById);
quizRouter.post("/", validateToken, validadeInput(createQuizSchema), quizController.createQuiz);
quizRouter.delete("/:id", validateToken, quizController.deleteQuiz);
quizRouter.patch("/:id", validateToken, validadeInput(updateQuizSchema), quizController.updateQuiz);

quizRouter.get("/user", validateToken, quizController.getAllUserQuizzes);
quizRouter.get("/user/last", validateToken, quizController.getLastUserQuiz);
quizRouter.get("/user/history", validateToken, quizController.getUserQuizHistory);

export { quizRouter };