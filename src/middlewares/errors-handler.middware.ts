import { Request, Response, NextFunction } from 'express';

export const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('\x1b[31m', err);
  next(err);
};

export const errorResponder = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.header('Content-Type', 'application/json');
  res.status(err.response.statusCode || err.status).send(err);
};

export const ErrorHandlerMiddlewares = [errorLogger, errorResponder];
