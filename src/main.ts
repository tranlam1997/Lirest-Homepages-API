import express from 'express';
import config from 'config';
import { logger, expressLogger } from './common/logger-config.common';
import 'reflect-metadata';
import cors from 'cors';
import debug from 'debug';
import { connectToDbWithRetry } from './common/database-config.common';
import routes from './routes';

(async () => {
  await connectToDbWithRetry();
  const app: express.Application = express();
  app.use(express.json());
  app.use(cors());
  app.use(expressLogger);

  const debugLog: debug.IDebugger = debug('app');
  const port = config.get('service.port');

  routes(app);

  app.listen(port, () => {
    logger('Main').info(`Service running at http://localhost:${port}`);
  });
})();

// import {userRouter} from './routes/users.routes';
// userRouter();
