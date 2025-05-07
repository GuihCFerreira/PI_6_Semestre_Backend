import { Router } from "express";
import { gameSuggestedRouter } from "./game-suggested-routes";

const gamesRouter = Router();

gamesRouter.use("/suggested", gameSuggestedRouter)

export { gamesRouter };