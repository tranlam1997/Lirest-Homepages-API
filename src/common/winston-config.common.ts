import expressWinston from 'express-winston';
import winston from 'winston';

const { combine, timestamp, printf, json, prettyPrint, colorize } = winston.format;
const formatInfo = printf(
  ({ level, message, timestamp }: { level: string; message: string; timestamp: string }) => {
    return `level: ${level}, timestamp: ${timestamp}, message: ${message}`;
  },
);
export const baseLoggerConfig = {
  format: combine(timestamp(), formatInfo, json()),
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

export const expressLoggerConfig = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(json(), prettyPrint(), colorize({ all: true })),
} as expressWinston.LoggerOptions;
