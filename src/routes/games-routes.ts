import { Router } from "express";
import { playLaterGamesRouter } from "./play-later-games-routes";

const gamesRouter = Router();

gamesRouter.use("/play-later", playLaterGamesRouter)

export { gamesRouter };