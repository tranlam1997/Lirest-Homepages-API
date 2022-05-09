import { UsersService } from './users.service';
import express from 'express';

export const UsersController = {
  createUser: async (req: express.Request, res: express.Response) => {
    await UsersService.createUser(req.body);
    res.status(201).json({ message: 'User created successfully' });
  },
};
