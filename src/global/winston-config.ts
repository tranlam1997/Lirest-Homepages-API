import winston, { LoggerOptions } from 'winston';

const { combine, timestamp, printf, json } = winston.format;
const formatInfo = printf(
  ({ level, message, timestamp }: { level: string; message: string; timestamp: string }) => {
    return `level: ${level}, timestamp: ${timestamp}, message: ${message}`;
  },
);
export default winston.createLogger({
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
} as LoggerOptions);
