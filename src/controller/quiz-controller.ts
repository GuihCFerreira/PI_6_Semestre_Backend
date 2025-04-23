import { Request, Response } from "express";
import quizService from "../service/quiz-service";
import AuthenticatedRequest from "../types/authenticated-request";

const getQuizTemplate = async (req: Request, res: Response) => {
    try {
        const quizTemplate = await quizService.getQuizTemplate();
        res.status(200).json(quizTemplate);
        return;
    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getAllQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await quizService.getAllQuizzes();
        res.status(200).json(quizzes);
        return;
    }
    catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getQuizById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Quiz ID is required" });
            return;
        }

        const quiz = await quizService.getQuizById(id);
        res.status(200).json(quiz);
        return;
    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getAllUserQuizzes = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const quizzes = await quizService.getAllUserQuizzes(userId);
        res.status(200).json(quizzes);
        return;
    }
    catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getLastUserQuiz = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const quiz = await quizService.getLastUserQuiz(userId);
        res.status(200).json(quiz);
        return;
    }
    catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getUserQuizHistory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const quizzes = await quizService.getUserQuizHistory(userId);
        res.status(200).json(quizzes);
        return;
    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const deleteQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Quiz ID is required" });
            return;
        }

        await quizService.deleteQuiz(id);
        res.status(204).send();
        return;
    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const updateQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!id) {
            res.status(400).json({ message: "Quiz ID is required" });
            return;
        }

        const updatedQuiz = await quizService.updateQuiz(id, data);
        res.status(200).json(updatedQuiz);
        return;
    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const createQuiz = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;
        const data = req.body;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        if (!data) {
            res.status(400).json({ message: "Quiz data is required" });
            return;
        }

        const quiz = await quizService.createQuiz(data, userId);
        res.status(201).json(quiz);
        return;
    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}


export default { 
    getQuizTemplate,
    getAllQuizzes,
    getQuizById,
    getAllUserQuizzes,
    getLastUserQuiz,
    getUserQuizHistory,
    createQuiz,
    updateQuiz,
    deleteQuiz, 
};