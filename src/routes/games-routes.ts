import { Router } from "express";
import { gameSuggestedRouter } from "./game-suggested-routes";
import { favoriteGamesRouter } from "./favorite-games-routes";
import { playLaterGamesRouter } from "./play-later-games-routes";

const gamesRouter = Router();

gamesRouter.use("/suggested", gameSuggestedRouter)
gamesRouter.use("/favorite", favoriteGamesRouter);
gamesRouter.use("/play-later", playLaterGamesRouter)

export { gamesRouter };