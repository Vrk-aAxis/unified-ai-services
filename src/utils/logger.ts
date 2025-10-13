import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(
  ({ level, message, timestamp, stack }: Record<string, unknown>) => {
    return `${timestamp as string} [${level as string}]: ${(stack as string) || (message as string)}`;
  }
);

// Determine if running on Vercel (read-only filesystem)
const isVercel = process.env.VERCEL === '1';

// Create transports - only Console for Vercel, add File for local
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: combine(colorize(), logFormat),
  }),
];

// Only add file transports in local development
if (!isVercel) {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    })
  );
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports,
});
