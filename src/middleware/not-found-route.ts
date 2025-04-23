import { Request, Response, NextFunction } from 'express';

export const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: 'This route does not exist',
    message: 'Please check the URL or Method and try again',
    path: req.originalUrl,
  });
};