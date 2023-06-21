"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const logger_1 = require("../../lib/logger");
class GqlErrorWithData extends Error {
    constructor(message, locations, path, extensions) {
        super(message);
        this.locations = locations;
        this.path = path;
        this.extensions = extensions;
    }
}
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor() {
        this.graphQLErrors = null;
    }
    setGraphQLErrors(errors) {
        this.graphQLErrors = errors;
    }
    catch(exception, host) {
        var _a;
        const isGraphQL = host.getType() === 'graphql';
        let status;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        if (isGraphQL) {
            const gqlCtx = graphql_1.GqlExecutionContext.create(host);
            const request = gqlCtx.getContext().req;
            const clientIp = request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                '';
            logger_1.default.error(`Request: ${request.method} ${request.originalUrl}`);
            logger_1.default.error(`Body: ${JSON.stringify(request.body, null, 2)}`);
            logger_1.default.error(`Response: ${status} Error: ${JSON.stringify(exception, null, 2)}`);
            logger_1.default.error(`Client IP: ${clientIp}`);
            const errorData = ((_a = this.graphQLErrors) === null || _a === void 0 ? void 0 : _a[0]) || {};
            const { locations, path, extensions } = errorData;
            throw new GqlErrorWithData(exception.message || 'An error occurred', locations, path, extensions);
        }
        else {
            const ctx = host.switchToHttp();
            const req = ctx.getRequest();
            const res = ctx.getResponse();
            const clientIp = req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress ||
                req.connection.remoteAddress ||
                '';
            logger_1.default.error(`Request: ${req.method} ${req.originalUrl}`);
            logger_1.default.error(`Body: ${JSON.stringify(req.body, null, 2)}`);
            logger_1.default.error(`Response: ${status} Error: ${JSON.stringify(exception, null, 2)}`);
            logger_1.default.error(`Client IP: ${clientIp}`);
            res.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: req.url,
                message: exception.response.message,
            });
        }
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all-exceptions.filter.js.map