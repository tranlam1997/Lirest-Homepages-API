import { UsersService } from './users.service';
import express from 'express';
import { ICreateUserRequest, IGetUserByIdRequest } from './users.interface';

export const UsersController = {
  createUser: async (req: ICreateUserRequest, res: express.Response) => {
    await UsersService.createUser(req.body);
    return res.status(201).send({ success: true });
  },

  getUserById: async (req: IGetUserByIdRequest, res: express.Response) => {
    const user = await UsersService.getUserById(req.params.id);
    return res.status(200).send(user);
  },
};
