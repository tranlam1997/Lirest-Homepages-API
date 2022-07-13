import expressWinston from 'express-winston';
import winston from 'winston';

const { combine, timestamp, printf, json, colorize } = winston.format;
const formatInfo = printf(
  ({
    level,
    message,
    timestamp,
    serviceName,
  }: {
    level: string;
    message: string;
    timestamp: string;
    serviceName: string;
  }) => {
    return `[${serviceName}] level: ${level}, message: ${message}, timestamp: ${timestamp}.`;
  },
);
const baseLoggerConfig = {
  format: combine(timestamp(), formatInfo, colorize({ all: true })),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      handleRejections: true,
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  exitOnError: false,
} as winston.LoggerOptions;

export const logger = (serviceName: string) => {
  return winston.createLogger(baseLoggerConfig).child({ serviceName });
};

export const expressLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(json(), colorize({ all: true })),
} as expressWinston.LoggerOptions);
