import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import logger from 'src/lib/logger';
import { isIntrospectionQuery } from './utils/utils';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const isGraphQL = !ctx.getRequest();

    const gqlCtx = GqlExecutionContext.create(context);
    const request = isGraphQL ? gqlCtx.getContext().req : ctx.getRequest();
    const response = isGraphQL
      ? gqlCtx.getContext().req.res
      : ctx.getResponse();

    const operationName = request.body.operationName;
    const query = request.body.query;
    const startTime = Date.now();
    const clientIp =
      request.ip ||
      request.connection.remoteAddress ||
      request.headers['x-forwarded-for'];

    return next.handle().pipe(
      tap((data) => {
        if (isGraphQL && isIntrospectionQuery(operationName, query)) return;

        const endTime = Date.now();
        const duration = endTime - startTime;
        logger.info(`Request: ${request.method} ${request.originalUrl}`);
        logger.info(`Client IP: ${clientIp}`);
        logger.info(`Body: ${JSON.stringify(request.body, null, 2)}`);
        logger.info(
          `Response: ${response.statusCode} ${JSON.stringify(data, null, 2)}`,
        );
        logger.info(`Duration: ${duration} ms`);
      }),
      catchError((error) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        logger.error(`Request: ${request.method} ${request.originalUrl}`);
        logger.error(`Client IP: ${clientIp}`);
        logger.error(`Body: ${JSON.stringify(request.body, null, 2)}`);
        logger.error(
          `Response: ${response.statusCode} Error: ${JSON.stringify(
            error,
            null,
            2,
          )}`,
        );
        logger.error(`Duration: ${duration} ms`);
        throw error;
      }),
    );
  }
}
