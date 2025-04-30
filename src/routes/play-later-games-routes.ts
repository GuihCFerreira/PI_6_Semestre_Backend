import { Router } from "express";
import { verifyIdParam } from "../middleware/verify-id-param";
import { validadeInput } from "../middleware/validate-input";
import playLaterGamesController from "../controller/play-later-games-controller";
import { addPlayLaterGameSchema } from "../schema/play-later-games-schema";

const playLaterGamesRouter = Router();

playLaterGamesRouter.get("/", playLaterGamesController.getAllPlayLaterGames);
playLaterGamesRouter.get("/:id", verifyIdParam, playLaterGamesController.getPlayLaterGameById);
playLaterGamesRouter.post("/", validadeInput(addPlayLaterGameSchema), playLaterGamesController.addPlayLaterGame);
playLaterGamesRouter.delete("/:id", verifyIdParam, playLaterGamesController.removePlayLaterGame);

export { playLaterGamesRouter };