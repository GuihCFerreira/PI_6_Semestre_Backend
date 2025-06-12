import { Router } from "express";
import favoriteGamesController from "../controller/favorite-games-controller";
import { verifyIdParam } from "../middleware/verify-id-param";
import { validadeInput } from "../middleware/validate-input";
import { addFavoriteGameSchema } from "../schema/favorite-games-schema";

const favoriteGamesRouter = Router();

favoriteGamesRouter.get("/", favoriteGamesController.getAllFavoriteGames);
favoriteGamesRouter.get("/:id", verifyIdParam, favoriteGamesController.getFavoriteGameById);
favoriteGamesRouter.post("/", validadeInput(addFavoriteGameSchema), favoriteGamesController.addFavoriteGame);
favoriteGamesRouter.delete("/:id", favoriteGamesController.removeFavoriteGame);

export { favoriteGamesRouter };