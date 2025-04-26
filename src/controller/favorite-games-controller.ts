import favoriteGamesService from "../service/favorite-games-service";
import AuthenticatedRequest from "../types/authenticated-request";
import { Request, Response } from "express";

const getAllFavoriteGames = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const favoriteGames = await favoriteGamesService.getAllFavoriteGames(userId);
        res.status(200).json(favoriteGames);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getFavoriteGameById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Favorite game ID is required" });
            return;
        }

        const favoriteGame = await favoriteGamesService.getFavoriteGameById(id);
        res.status(200).json(favoriteGame);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const addFavoriteGame = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const userId = req.userId;
        const data = req.body;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        if (!data) {
            res.status(400).json({ message: "Favorite game data is required" });
            return;
        }

        const favoriteGame = await favoriteGamesService.addFavoriteGame(data, userId);
        res.status(201).json(favoriteGame);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const removeFavoriteGame = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Favorite game ID is required" });
            return;
        }

        await favoriteGamesService.removeFavoriteGame(id);
        res.status(204).send();
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

export default {
    getAllFavoriteGames,
    getFavoriteGameById,
    addFavoriteGame,
    removeFavoriteGame
}