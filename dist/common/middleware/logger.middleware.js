"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("../../lib/logger");
const utils_1 = require("../../utils/utils");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const operationName = req.body.operationName;
        const query = req.body.query;
        const startTime = Date.now();
        const clientIp = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
        if (!(0, utils_1.isIntrospectionQuery)(operationName, query)) {
            let responseData = '';
            const originalWrite = res.write.bind(res);
            res.write = (chunk) => {
                responseData += chunk;
                return originalWrite(chunk);
            };
            res.on('finish', () => {
                const endTime = Date.now();
                const duration = endTime - startTime;
                try {
                    logger_1.default.info(`Request: ${req.method} ${req.originalUrl}`);
                    logger_1.default.info(`Client IP: ${clientIp}`);
                    logger_1.default.info(`Duration: ${duration} ms`);
                }
                catch (error) {
                    logger_1.default.error(`Request: ${req.method} ${req.originalUrl}`);
                    logger_1.default.error(`Client IP: ${clientIp}`);
                    logger_1.default.error(`Body: ${JSON.stringify(req.body, null, 2)}`);
                    logger_1.default.error(`Response: ${res.statusCode} ${responseData}`);
                    logger_1.default.error(`Duration: ${duration} ms`);
                }
            });
        }
        next();
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map