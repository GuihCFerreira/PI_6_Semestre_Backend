import { Request, Response } from "express";
import gamesService from "../service/games-service";
import AuthenticatedRequest from "../types/authenticated-request";

const getGameByGameId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Game suggested ID is required" });
            return;
        }

        const gameId = parseInt(id, 10) ;
        const game = await gamesService.getGameByGameId(gameId);

        res.status(200).json(game);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getGameRecomendations = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const recomendations = await gamesService.getGameRecomendations(userId);

        res.status(200).json(recomendations);
        return;

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getAllGames = async (req: Request, res: Response) => {
    try {

        const { page = "1", perPage = "20" } = req.query;
        
        const games = await gamesService.getAllGames(parseInt(page as string, 10), parseInt(perPage as string, 10));

        res.status(200).json(games);
        return;

    }
    catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getGamesForQuizTemplate = async (req: Request, res: Response) => {
    try {

        const { page = "1", perPage = "20" } = req.query;

        const games = await gamesService.getGamesForQuizTemplate(parseInt(page as string, 10), parseInt(perPage as string, 10));

        res.status(200).json(games);
        return;

    }
    catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

export default {
    getGameByGameId,
    getGameRecomendations,
    getAllGames,
    getGamesForQuizTemplate
}