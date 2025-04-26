import { Router } from "express";
import { favoriteGamesRouter } from "./favorite-games-routes";

const gamesRouter = Router();

gamesRouter.use("/favorite", favoriteGamesRouter);

export { gamesRouter };