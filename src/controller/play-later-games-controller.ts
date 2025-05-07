import playLaterGamesService from "../service/play-later-games-service";
import AuthenticatedRequest from "../types/authenticated-request";
import { Request, Response } from "express";

const getAllPlayLaterGames = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const playLaterGames = await playLaterGamesService.getAllPlayLaterGames(userId);
        res.status(200).json(playLaterGames);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getPlayLaterGameById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Play later game ID is required" });
            return;
        }

        const playLaterGame = await playLaterGamesService.getPlayLaterGameById(id);
        res.status(200).json(playLaterGame);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const addPlayLaterGame = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const userId = req.userId;
        const data = req.body;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        if (!data) {
            res.status(400).json({ message: "Play later game data is required" });
            return;
        }

        const playLaterGame = await playLaterGamesService.addPlayLaterGame(data, userId);
        res.status(201).json(playLaterGame);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const removePlayLaterGame = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Play later game ID is required" });
            return;
        }

        await playLaterGamesService.removePlayLaterGame(id);
        res.status(204).send();
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

export default {
    getAllPlayLaterGames,
    getPlayLaterGameById,
    addPlayLaterGame,
    removePlayLaterGame
}