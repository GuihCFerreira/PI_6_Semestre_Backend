import jwt from "jsonwebtoken";
import userRepository from "../repository/user-repository";

const validateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET not found in .env file" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: `Unauthorized: ${err.message}` });
    }

    const userId = decoded.userId;

    const user = await userRepository.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.userId = decoded.userId;
    next();
  });
};

export { validateToken };