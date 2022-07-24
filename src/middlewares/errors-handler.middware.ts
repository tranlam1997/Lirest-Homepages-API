import { Request, Response, NextFunction } from 'express';

const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('\x1b[31m', err);
  next(err);
};

const errorResponder = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.header('Content-Type', 'application/json');
  res.status(err.response.statusCode).send(err.response);
};

const invalidPathHandler = (_err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.redirect('/error');
};

export { errorLogger, errorResponder, invalidPathHandler };
