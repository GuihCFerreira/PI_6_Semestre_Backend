import { Router } from "express";
import { gamesPlayedRouter } from "./played-games-routes";

const gamesRouter = Router();

gamesRouter.use("/played", gamesPlayedRouter);

export { gamesRouter };