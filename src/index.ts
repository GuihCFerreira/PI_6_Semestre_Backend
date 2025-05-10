import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./database";
import { router } from "./routes";
import connectToCloudinary from "./storage/cloudinary";

config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(router)

const port: string = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToDatabase();
  connectToCloudinary();
});
