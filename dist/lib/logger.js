"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { printf } = winston.format;
const logFormat = printf(({ timestamp, level, message, stack }) => {
    const formattedMessage = stack
        ? `(${timestamp}) [${level}] ${message} ${stack}`
        : `(${timestamp}) [${level}] ${message}`;
    return formattedMessage.replace(/\\n/g, '\n');
});
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '5d',
            level: 'error',
        }),
        new DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '5d',
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map