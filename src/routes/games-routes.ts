import { Router } from "express";
import { gameSuggestedRouter } from "./game-suggested-routes";
import { favoriteGamesRouter } from "./favorite-games-routes";
import { playLaterGamesRouter } from "./play-later-games-routes";
import { gamesPlayedRouter } from "./played-games-routes";
import gamesController from "../controller/games-controller";
import { verifyIdParam } from "../middleware/verify-id-param";
import { validateToken } from "../middleware/validate-token";

const gamesRouter = Router();

gamesRouter.use("/suggested", validateToken, gameSuggestedRouter)
gamesRouter.use("/favorite", validateToken, favoriteGamesRouter);
gamesRouter.use("/play-later", validateToken, playLaterGamesRouter)
gamesRouter.use("/played", validateToken, gamesPlayedRouter);

gamesRouter.get("/", validateToken, gamesController.getAllGames)
gamesRouter.get("/recomendations", validateToken, gamesController.getGameRecomendations)
gamesRouter.get("/quiz/template", gamesController.getGamesForQuizTemplate)
gamesRouter.get("/:id", validateToken, verifyIdParam, gamesController.getGameByGameId)

export { gamesRouter };