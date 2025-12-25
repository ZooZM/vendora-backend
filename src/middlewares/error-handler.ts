import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === "RequestError") {
    // mssql request error
    statusCode = 400;
    message = "Database request error";
  }

  // In development, send more details
  if (process.env.NODE_ENV === "development") {
    console.error(err);
    return res.status(statusCode).json({
      status: "error",
      message,
      error: err,
      stack: err.stack,
    });
  }

  // In production, send a generic message
  return res.status(statusCode).json({
    status: "error",
    message,
  });
};
export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
