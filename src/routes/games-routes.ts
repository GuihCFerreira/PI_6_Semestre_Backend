import { Router } from "express";
import { gameSuggestedRouter } from "./game-suggested-routes";
import { favoriteGamesRouter } from "./favorite-games-routes";
import { playLaterGamesRouter } from "./play-later-games-routes";
import { gamesPlayedRouter } from "./played-games-routes";
import gamesController from "../controller/games-controller";

const gamesRouter = Router();

gamesRouter.get("/", gamesController.getAllGames)
gamesRouter.get("/quiz/template", gamesController.getGamesForQuizTemplate)
gamesRouter.get("/:id", gamesController.getGameById)
gamesRouter.get("/recomendations", gamesController.getGameRecomendations)

gamesRouter.use("/suggested", gameSuggestedRouter)
gamesRouter.use("/favorite", favoriteGamesRouter);
gamesRouter.use("/play-later", playLaterGamesRouter)
gamesRouter.use("/played", gamesPlayedRouter);

export { gamesRouter };