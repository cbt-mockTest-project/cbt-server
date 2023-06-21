import { ExceptionFilter, ExecutionContext } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    graphQLErrors: any[] | null;
    setGraphQLErrors(errors: any[]): void;
    catch(exception: any, host: ExecutionContext): void;
}
