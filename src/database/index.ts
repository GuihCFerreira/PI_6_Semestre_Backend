import { db } from "./prisma";

export const connectToDatabase = async () => {
  try {
    await db.$connect();
    console.log("Successfully connected to the database!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
