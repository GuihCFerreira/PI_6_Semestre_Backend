import { Request, Response, NextFunction } from "express";

export function verifyIdParam(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Invalid ID. ID is required on query" });
    return;
  }

  const cuidPattern = /^[a-zA-Z0-9]{25}$/;
  if (!cuidPattern.test(id)) {
    res.status(400).json({
      error:
        "Invalid ID. ID must be a valid cuid (25 alphanumeric characters).",
    });
    return;
  }

  next();
}
