import { NextFunction, Request, Response } from "express";

// Function to log incoming requests
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
};
