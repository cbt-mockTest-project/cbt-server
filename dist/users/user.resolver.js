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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const sendFindPasswordMail_dto_1 = require("./dtos/sendFindPasswordMail.dto");
const checkPassword_dto_1 = require("./dtos/checkPassword.dto");
const me_dto_1 = require("./dtos/me.dto");
const output_dto_1 = require("../common/dtos/output.dto");
const sendVerificationMail_dto_1 = require("./dtos/sendVerificationMail.dto");
const login_dto_1 = require("./dtos/login.dto");
const userProfile_dto_1 = require("./dtos/userProfile.dto");
const register_dto_1 = require("./dtos/register.dto");
const user_entity_1 = require("./entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const EmailVerification_dto_1 = require("./dtos/EmailVerification.dto");
const role_decorators_1 = require("../auth/role.decorators");
const editProfile_dto_1 = require("./dtos/editProfile.dto");
const restoreUser_dto_1 = require("./dtos/restoreUser.dto");
const changePasswordAfterVerifying_dto_1 = require("./dtos/changePasswordAfterVerifying.dto");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async register(registerInput) {
        return this.userService.register(registerInput);
    }
    async userProfile(userProfileInput) {
        return this.userService.userProfile(userProfileInput);
    }
    async login(loginInput, context) {
        const res = context.req.res;
        return this.userService.login(loginInput, res);
    }
    async logout(context) {
        const res = context.req.res;
        return this.userService.logout(res);
    }
    async sendVerificationMail(sendVerificationMailInput) {
        return this.userService.sendVerificationMail(sendVerificationMailInput);
    }
    me(user) {
        return this.userService.me(user);
    }
    async emailVerification(emailVerificationInput) {
        return this.userService.emailVerification(emailVerificationInput);
    }
    async checkPassword(checkPassWordInput, user) {
        return this.userService.checkPassword(checkPassWordInput, user);
    }
    async editProfile(editProfileInput, user) {
        return this.userService.editProfile(editProfileInput, user);
    }
    async deleteUser(user) {
        return this.userService.deleteUser(user);
    }
    async restoreUser(restoreUserInput) {
        return this.userService.restoreUser(restoreUserInput);
    }
    async sendFindPasswordMail(sendFindPasswordMailInput) {
        return this.userService.sendFindPasswordMail(sendFindPasswordMailInput);
    }
    async changePasswordAfterVerifying(changePasswordAfterVerifyingInput) {
        return this.userService.changePasswordAfterVerifying(changePasswordAfterVerifyingInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => register_dto_1.RegisterOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Query)(() => userProfile_dto_1.UserProfileOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userProfile_dto_1.UserProfileInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userProfile", null);
__decorate([
    (0, graphql_1.Mutation)(() => login_dto_1.LoginOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => output_dto_1.CoreOutput),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, graphql_1.Mutation)(() => sendVerificationMail_dto_1.SendVerificationMailOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendVerificationMail_dto_1.SendVerificationMailInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "sendVerificationMail", null);
__decorate([
    (0, graphql_1.Query)(() => me_dto_1.MeOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, graphql_1.Mutation)(() => EmailVerification_dto_1.EmailVerificationOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailVerification_dto_1.EmailVerificationInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "emailVerification", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => checkPassword_dto_1.CheckPasswordOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkPassword_dto_1.CheckPasswordInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "checkPassword", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => editProfile_dto_1.EditProfileOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editProfile_dto_1.EditProfileInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "editProfile", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => output_dto_1.CoreOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => output_dto_1.CoreOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restoreUser_dto_1.RestoreUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "restoreUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => sendFindPasswordMail_dto_1.SendFindPasswordMailOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendFindPasswordMail_dto_1.SendFindPasswordMailInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "sendFindPasswordMail", null);
__decorate([
    (0, graphql_1.Mutation)(() => changePasswordAfterVerifying_dto_1.ChangePasswordAfterVerifyingOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePasswordAfterVerifying_dto_1.ChangePasswordAfterVerifyingInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePasswordAfterVerifying", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map