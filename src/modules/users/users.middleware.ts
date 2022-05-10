import express from 'express';
import { UsersService } from './users.service';

export function checkDuplicateUser() {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await UsersService.getUserByEmail(req.body.email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    next();
  };
}
