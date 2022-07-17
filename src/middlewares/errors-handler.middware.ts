import { Request, Response, NextFunction } from 'express';

const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('\x1b[31m', err);
  next(err);
};

const errorResponder = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.header('Content-Type', 'application/json');
  res.status(err.statusCode).send({ message: err.message });
};

const invalidPathHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.redirect('/error');
};

export { errorLogger, errorResponder, invalidPathHandler };
