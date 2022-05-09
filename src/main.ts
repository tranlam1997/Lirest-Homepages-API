import express from 'express';
import config from 'config';
import { logger, expressLogger } from './common/logger-config.common';
import 'reflect-metadata';
import cors from 'cors';
import debug from 'debug';
import { connectToDbWithRetry } from './common/database-config.common';
import userRoutes from './routes/users.routes';
import { UsersController } from './modules/users/users.controller';
import { BooksController } from './modules/books/books.controller';

(async () => {
  await connectToDbWithRetry();
  const app: express.Application = express();
  app.use(express.json());
  app.use(cors());
  app.use(expressLogger);

  const debugLog: debug.IDebugger = debug('app');
  const port = config.get('service.port');

  app.post('/users', UsersController.createUser);
  app.post('/books', BooksController.createBook);

  app.listen(port, () => {
    logger('Main').info(`Service running at http://localhost:${port}`);
  });
})();
