import express from 'express';
import config from 'config';
import { logger, expressLogger } from './common/logger-config';
import 'reflect-metadata';
import cors from 'cors';
import debug from 'debug';
import { connectToDbWithRetry } from './common/database-config';
import routes from './routes';
import swaggerUI from 'swagger-ui-express';
import { openAPISpecification, swaggerUIOptions } from 'src/common/swagger/swagger-config';

(async () => {
  await connectToDbWithRetry();
  const app: express.Application = express();
  app.use(express.json());
  app.use(cors());
  app.use(expressLogger);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPISpecification, swaggerUIOptions));

  const debugLog: debug.IDebugger = debug('app');
  const port = config.get('service.port');

  routes(app);

  app.listen(port, () => {
    logger('Main').info(`Service running at http://localhost:${port}`);
  });
})();
