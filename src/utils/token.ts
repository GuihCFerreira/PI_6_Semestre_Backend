import jwt from "jsonwebtoken";

const generateToken = async (userId: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not found in .env file");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


export { generateToken };