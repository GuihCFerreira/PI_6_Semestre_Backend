import { Router } from "express";
import { verifyIdParam } from "../middleware/verify-id-param";
import { validadeInput } from "../middleware/validate-input";
import playedGamesController from "../controller/played-games-controller";
import { addPlayedGameSchema } from "../schema/played-games-schema";

const gamesPlayedRouter = Router();

gamesPlayedRouter.get("/", playedGamesController.getAllPlayedGames);
gamesPlayedRouter.get("/:id", verifyIdParam, playedGamesController.getPlayedGameById);
gamesPlayedRouter.post("/", validadeInput(addPlayedGameSchema), playedGamesController.addPlayedGame);
gamesPlayedRouter.delete("/:id", verifyIdParam, playedGamesController.deletePlayedGame);

export { gamesPlayedRouter };