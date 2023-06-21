"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const operators_1 = require("rxjs/operators");
const logger_1 = require("./lib/logger");
const utils_1 = require("./utils/utils");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const isGraphQL = !ctx.getRequest();
        const gqlCtx = graphql_1.GqlExecutionContext.create(context);
        const request = isGraphQL ? gqlCtx.getContext().req : ctx.getRequest();
        const response = isGraphQL
            ? gqlCtx.getContext().req.res
            : ctx.getResponse();
        const operationName = request.body.operationName;
        const query = request.body.query;
        const startTime = Date.now();
        const clientIp = request.ip ||
            request.connection.remoteAddress ||
            request.headers['x-forwarded-for'];
        return next.handle().pipe((0, operators_1.tap)((data) => {
            if (isGraphQL && (0, utils_1.isIntrospectionQuery)(operationName, query))
                return;
            const endTime = Date.now();
            const duration = endTime - startTime;
            logger_1.default.info(`Request: ${request.method} ${request.originalUrl}`);
            logger_1.default.info(`Client IP: ${clientIp}`);
            logger_1.default.info(`Operation: ${JSON.stringify(request.body['operationName'], null, 2)}`);
            logger_1.default.info(`Duration: ${duration} ms`);
        }), (0, operators_1.catchError)((error) => {
            const endTime = Date.now();
            const duration = endTime - startTime;
            logger_1.default.error(`Request: ${request.method} ${request.originalUrl}`);
            logger_1.default.error(`Client IP: ${clientIp}`);
            logger_1.default.error(`Body: ${JSON.stringify(request.body, null, 2)}`);
            logger_1.default.error(`Response: ${response.statusCode} Error: ${JSON.stringify(error, null, 2)}`);
            logger_1.default.error(`Duration: ${duration} ms`);
            throw error;
        }));
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.interceptor.js.map