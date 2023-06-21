"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const utils_1 = require("./../utils/utils");
const user_service_1 = require("./../users/user.service");
const jwt_service_1 = require("../jwt/jwt.service");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
let AuthGuard = class AuthGuard {
    constructor(reflector, jwtService, userService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async canActivate(context) {
        var _a;
        const roles = this.reflector.get('roles', context.getHandler());
        const gqlContext = graphql_1.GqlExecutionContext.create(context).getContext();
        const cookie = (_a = gqlContext.headers) === null || _a === void 0 ? void 0 : _a.cookie;
        const token = cookie && (0, utils_1.getCookie)(String(cookie), 'jwt-token');
        if (token) {
            const decodedToken = this.jwtService.verify(token);
            if (typeof decodedToken === 'object' &&
                decodedToken.hasOwnProperty('id')) {
                const userId = decodedToken.id;
                const { user } = await this.userService.userProfile({ id: userId });
                if (user) {
                    gqlContext['user'] = user;
                }
                if (roles) {
                    if (roles.includes('ANY')) {
                        return true;
                    }
                    return roles.includes(user.role);
                }
            }
        }
        if (!roles) {
            return true;
        }
        return false;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_service_1.JwtService,
        user_service_1.UserService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map