import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validadeInput =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { success, error, data } = schema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ error: error });
      return;
    }

    req.body = data;

    next();
  };

export { validadeInput };
