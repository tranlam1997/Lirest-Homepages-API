import { UsersService } from './users.service';
import express from 'express';
import { CreateUserRequestDto, GetUserRequestDto } from './users.dto';

export const UsersController = {
  createUser: async (req: CreateUserRequestDto, res: express.Response) => {
    await UsersService.createUser(req.body);
    return res.status(201).send({ success: true });
  },

  getUser: async (req: GetUserRequestDto, res: express.Response) => {
    return res.status(200).send(req.data);
  },
};
