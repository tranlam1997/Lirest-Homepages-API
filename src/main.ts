import express from 'express';
import config from 'config';
import { logger, expressLogger } from './common/logger-config.common';
import 'reflect-metadata';
import cors from 'cors';
import debug from 'debug';
import { CommonRoutesConfig } from './common/routes-config.common';
import { UserRoutes } from './routes/users.routes';
import { connectToDbWithRetry } from './common/database-config.common';

(async () => {
  await connectToDbWithRetry();
  const app: express.Application = express();
  app.use(express.json());
  app.use(cors());
  app.use(expressLogger);

  const routes: Array<CommonRoutesConfig> = [];
  const debugLog: debug.IDebugger = debug('app');
  const port = config.get('service.port');

  routes.push(new UserRoutes(app));

  app.get('/', (req: express.Request, res: express.Response) => {
    return res.status(200).send('Ping!');
  });

  app.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
    });
    logger('Main').info(`Service running at http://localhost:${port}`);
  });
})();
