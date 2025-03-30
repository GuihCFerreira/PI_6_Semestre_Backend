import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";

config();

const app: Express = express();

app.use(express.json());
app.use(cors());

const port: string = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
