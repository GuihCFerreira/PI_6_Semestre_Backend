import { Request, Response } from "express";
import quizService from "../service/quiz-service";

const getQuizTemplate = async (req: Request, res: Response) => {
    try {
        const quizTemplate = await quizService.getQuizTemplate();
        res.status(200).json(quizTemplate);
        return;
    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

export default { getQuizTemplate };