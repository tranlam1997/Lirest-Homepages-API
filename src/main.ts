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
import https from 'https';
import fs from 'fs';
import path from 'path';
import {
  errorLogger,
  errorResponder,
  invalidPathHandler,
} from './middlewares/errors-handler.middware';

const app: express.Application = express();
app.use(express.json());
app.use(cors());
app.use(expressLogger);
// app.use(['/api-docs'], basicAuthen({
//   challenge: true,
//   users: {
//     admin: 'abcdef',
//   },
// }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPISpecification, swaggerUIOptions));

const debugLog: debug.IDebugger = debug('app');
const port = config.get('service.port');
const host = config.get('service.host');
routes(app);
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);
const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../certs/ssl/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../certs/ssl/cert.pem')),
};

https.createServer(options, app).listen(port, () => {
  logger('Main').info(`Service running at https://${host}:${port}`);
  connectToDbWithRetry();
});
