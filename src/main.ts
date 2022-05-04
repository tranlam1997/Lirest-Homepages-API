import express from 'express';
import config from 'config';
import { baseLoggerConfig, expressLoggerConfig } from './common/winston-config.common';
import 'reflect-metadata';
import cors from 'cors';
import debug from 'debug';
import expressWinston from 'express-winston';
import winston from 'winston';
import { CommonRoutesConfig } from './common/routes-config.common';
import { UserRoutes } from './routes/users.routes';

const app: express.Application = express();
app.use(express.json());
app.use(cors());
app.use(expressWinston.logger(expressLoggerConfig));

const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');
const logger = winston.createLogger(baseLoggerConfig);
const port = config.get('service.port');

routes.push(new UserRoutes(app));
app.get('/', (req: express.Request, res: express.Response) => {
  return res.status(200).send('Ping!');
});

app.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  logger.info(`Example app listening at http://localhost:${port}`);
});
