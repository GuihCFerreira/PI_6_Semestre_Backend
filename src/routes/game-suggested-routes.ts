import { Router } from "express";
import { validadeInput } from "../middleware/validate-input";
import gameSuggestedController from "../controller/game-suggested-controller";
import { verifyIdParam } from "../middleware/verify-id-param";
import { createGameSuggestedSchema, createManyGameSuggestedSchema, updateGameSuggestedSchema } from "../schema/game-suggested-schema";

const gameSuggestedRouter = Router();

gameSuggestedRouter.get("/", gameSuggestedController.getAllGameSuggested);
gameSuggestedRouter.get("/:id", verifyIdParam, gameSuggestedController.getGameSuggestedById);
gameSuggestedRouter.post("/", validadeInput(createGameSuggestedSchema), gameSuggestedController.createGameSuggested);
gameSuggestedRouter.post("/many", validadeInput(createManyGameSuggestedSchema), gameSuggestedController.createManyGameSuggested);
gameSuggestedRouter.patch("/:id", verifyIdParam, validadeInput(updateGameSuggestedSchema), gameSuggestedController.updateGameSuggested);
gameSuggestedRouter.delete("/:id", verifyIdParam, gameSuggestedController.deleteGameSuggested);

gameSuggestedRouter.get("/quiz/:id", verifyIdParam, gameSuggestedController.getAllGameSuggestedByQuizId);
gameSuggestedRouter.delete("/quiz/:id", verifyIdParam, gameSuggestedController.deleteAllGameSuggestedByQuizId);

export { gameSuggestedRouter };