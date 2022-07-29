import { Request, Response, NextFunction } from 'express';

export const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('\x1b[31m', err);
  next(err);
};

export const errorResponder = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.header('Content-Type', 'application/json');
  res.status(err.response.statusCode).send(err.response);
};

export const invalidPathHandler = (
  _err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.redirect('/error');
};

export const ErrorHandlerMiddlewares = [errorLogger, errorResponder, invalidPathHandler];
