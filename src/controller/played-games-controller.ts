import playedGamesService from "../service/played-games-service";
import AuthenticatedRequest from "../types/authenticated-request";
import { Request, Response } from "express";

const getAllPlayedGames = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const playedGames = await playedGamesService.getAllPlayedGames(userId);
        res.status(200).json(playedGames);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getPlayedGameById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Played game ID is required" });
            return;
        }

        const playedGame = await playedGamesService.getPlayedGameById(id);
        res.status(200).json(playedGame);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const addPlayedGame = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const userId = req.userId;
        const data = req.body;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        if (!data) {
            res.status(400).json({ message: "Played game data is required" });
            return;
        }

        const playedGame = await playedGamesService.addPlayedGame(data, userId);
        res.status(201).json(playedGame);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const deletePlayedGame = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Played game ID is required" });
            return;
        }

        await playedGamesService.deletePlayedGame(id);
        res.status(204).send();
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

export default {
    getAllPlayedGames,
    getPlayedGameById,
    addPlayedGame,
    deletePlayedGame
}