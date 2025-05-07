import { Request, Response } from "express";
import gameSuggestedService from "../service/game-suggested-service";

const getAllGameSuggested = async (req: Request, res: Response) => {
    try {
        const gameSuggested = await gameSuggestedService.getAllGameSuggested();
        res.status(200).json(gameSuggested);
        return;
    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getGameSuggestedById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Game suggested ID is required" });
            return;
        }

        const gameSuggested = await gameSuggestedService.getGameSuggestedById(id);
        res.status(200).json(gameSuggested);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getAllGameSuggestedByQuizId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Quiz ID is required" });
            return;
        }

        const gameSuggested = await gameSuggestedService.getAllGameSuggestedByQuizId(id);
        res.status(200).json(gameSuggested);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
} 

const deleteGameSuggested = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Game suggested ID is required" });
            return;
        }

        await gameSuggestedService.deleteGameSuggested(id);
        res.status(204).send();
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const deleteAllGameSuggestedByQuizId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Quiz ID is required" });
            return;
        }

        await gameSuggestedService.deleteAllGameSuggestedByQuizId(id);
        res.status(204).send();
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const createGameSuggested = async (req: Request, res: Response) => {
    try {
        const gameSuggested = req.body;

        if (!gameSuggested) {
            res.status(400).json({ message: "Game suggested is required" });
            return;
        }

        const createdGameSuggested = await gameSuggestedService.createGameSuggested(gameSuggested);
        res.status(201).json(createdGameSuggested);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const createManyGameSuggested = async (req: Request, res: Response) => {
    try {
        const gameSuggested = req.body;

        if (!gameSuggested) {
            res.status(400).json({ message: "Game suggested is required" });
            return;
        }

        const createdGameSuggested = await gameSuggestedService.createManyGameSuggested(gameSuggested);
        res.status(201).json(createdGameSuggested);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const updateGameSuggested = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const gameSuggested = req.body;

        if (!id) {
            res.status(400).json({ message: "Game suggested ID is required" });
            return;
        }

        if (!gameSuggested) {
            res.status(400).json({ message: "Game suggested is required" });
            return;
        }

        const updatedGameSuggested = await gameSuggestedService.updateGameSuggested(id, gameSuggested);
        res.status(200).json(updatedGameSuggested);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

export default {
    getAllGameSuggested,
    getGameSuggestedById,
    getAllGameSuggestedByQuizId,
    createGameSuggested,
    createManyGameSuggested,
    updateGameSuggested,
    deleteGameSuggested,
    deleteAllGameSuggestedByQuizId,
}