import { CommonRoutesConfig } from '../common/routes-config.common';
import express from 'express';

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'user');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/user')
      .get((req: express.Request, res: express.Response) => {
        return res.status(200).send('List of users');
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send(`Post to users`);
      });

    this.app
      .route(`/users/:userId`)
      .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
        next();
      })
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.userId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id ${req.params.userId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.userId}`);
      });

    return this.app;
  }
}
