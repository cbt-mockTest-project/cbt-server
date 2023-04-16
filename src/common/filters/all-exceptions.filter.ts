import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import logger from 'src/lib/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ExecutionContext) {
    const isGraphQL = host.getType<GqlContextType>() === 'graphql';

    let status: number;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    if (isGraphQL) {
      const gqlCtx = GqlExecutionContext.create(host);
      const request = gqlCtx.getContext().req;

      logger.error(`Request: ${request.method} ${request.originalUrl}`);
      logger.error(`Body: ${JSON.stringify(request.body, null, 2)}`);
      logger.error(
        `Response: ${status} Error: ${JSON.stringify(exception, null, 2)}`,
      );
      throw exception; // 에러를 직접 던지도록 변경
    } else {
      const ctx = host.switchToHttp();
      const req = ctx.getRequest<Request>();
      const res = ctx.getResponse<Response>();

      logger.error(`Request: ${req.method} ${req.originalUrl}`);
      logger.error(`Body: ${JSON.stringify(req.body, null, 2)}`);
      logger.error(
        `Response: ${status} Error: ${JSON.stringify(exception, null, 2)}`,
      );

      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }
  }
}
