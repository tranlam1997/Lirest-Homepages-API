import { DataSource, DataSourceOptions } from 'typeorm';
import { logger } from './logger-config.common';
import config from 'config';

const serviceName = 'Database';
const dataSource: DataSource = new DataSource({
  type: 'mysql',
  host: config.get('mysql.host'),
  port: config.get('mysql.port'),
  username: config.get('mysql.username'),
  password: config.get('mysql.password'),
  database: config.get('mysql.database'),
  synchronize: true,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: [],
  subscribers: [],
} as DataSourceOptions);

async function connectToDbWithRetry(): Promise<void> {
  logger(serviceName).info('Connecting to database...');
  try {
    await dataSource.initialize();
    logger(serviceName).info('Database connected');
  } catch (error) {
    const retryInterval = 5000;
    logger(serviceName).error(
      `Database connection fail with ${error}, retrying in ${retryInterval}ms...`,
    );
    setTimeout(connectToDbWithRetry.bind(this), retryInterval);
  }
}

export { connectToDbWithRetry, dataSource };
