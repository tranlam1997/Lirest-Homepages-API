import express, { Express, Request, Response } from 'express';
import config from 'config';
import colors from 'colors';
import logger from './global/winston-config';

const app: Express = express();
const port = config.get('service.port');
colors.enable();

app.get('/', (req: Request, res: Response) => {
  return res.send('Ping!');
});

app.listen(3000, () => {
  logger.info(`Example app listening at http://localhost:${port}`);
});
