import winston from 'winston';
import fs from 'fs';
import path, { format } from 'path';
import config from '../config'
import { log } from 'console';

const { isDev, logDir } =config;

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log formats
const logFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.splat(),
	winston.format.errors({ stack: true }),
	winston.format.json()
);

const consoleFormat = winston.format.combine(
	winston.format.colorize(),
	winston.format.timestamp({ format: 'HH:mm:ss' }),
	winston.format.splat(),
	winston.format.printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `[${timestamp}] ${level}: ${message}\n${stack}`
      : `[${timestamp}] ${level}: ${message}`;
  })
);

// Create Winston logger instance
const logger = winston.createLogger({
	level: isDev ? 'debug' : 'info',
	format: logFormat,
	transports: [
    new winston.transports.File({filename:'logs/error.log',dirname:logDir,level: 'error', format:logFormat}),
    new winston.transports.File({filename:  'logs/all.log',dirname:logDir,format:logFormat}),
  	],
exceptionHandlers :[
    new winston.transports.File({filename:  'logs/exceptions.log'}),
]
});

if (isDev) {
  logger.add(new winston.transports.Console({
    format: consoleFormat,
  }));
  logger.level='debug';
}

export default logger;