import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import logger from 'src/lib/logger';
import { isIntrospectionQuery } from 'src/utils/utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const operationName = req.body.operationName;
    const query = req.body.query;
    const startTime = Date.now();
    const clientIp =
      req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];

    if (!isIntrospectionQuery(operationName, query)) {
      let responseData = '';

      const originalWrite = res.write.bind(res);
      res.write = (chunk: any): boolean => {
        responseData += chunk;
        return originalWrite(chunk);
      };
      res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        try {
          logger.info(`Request: ${req.method} ${req.originalUrl}`);
          logger.info(`Client IP: ${clientIp}`);
          logger.info(`Duration: ${duration} ms`);
        } catch (error) {
          logger.error(`Request: ${req.method} ${req.originalUrl}`);
          logger.error(`Client IP: ${clientIp}`);
          logger.error(`Body: ${JSON.stringify(req.body, null, 2)}`);
          logger.error(`Response: ${res.statusCode} ${responseData}`);
          logger.error(`Duration: ${duration} ms`);
        }
      });
    }

    next();
  }
}
