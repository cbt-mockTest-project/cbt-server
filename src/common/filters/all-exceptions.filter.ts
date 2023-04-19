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

class GqlErrorWithData extends Error {
  constructor(
    message: string,
    public locations: any,
    public path: any,
    public extensions: any,
  ) {
    super(message);
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public graphQLErrors: any[] | null = null;
  setGraphQLErrors(errors: any[]) {
    this.graphQLErrors = errors;
  }
  catch(exception: any, host: ExecutionContext) {
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
      const clientIp =
        request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        '';
      logger.error(`Request: ${request.method} ${request.originalUrl}`);
      logger.error(`Body: ${JSON.stringify(request.body, null, 2)}`);
      logger.error(
        `Response: ${status} Error: ${JSON.stringify(exception, null, 2)}`,
      );
      logger.error(`Client IP: ${clientIp}`);
      const errorData = this.graphQLErrors?.[0] || {}; // 첫 번째 graphQLError를 가져옵니다.

      const { locations, path, extensions } = errorData;
      throw new GqlErrorWithData(
        exception.message || 'An error occurred',
        locations,
        path,
        extensions,
      );
    } else {
      const ctx = host.switchToHttp();
      const req = ctx.getRequest<Request>();
      const res = ctx.getResponse<Response>();
      const clientIp =
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        req.connection.remoteAddress ||
        '';
      logger.error(`Request: ${req.method} ${req.originalUrl}`);
      logger.error(`Body: ${JSON.stringify(req.body, null, 2)}`);
      logger.error(
        `Response: ${status} Error: ${JSON.stringify(exception, null, 2)}`,
      );
      logger.error(`Client IP: ${clientIp}`);

      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }
  }
}
