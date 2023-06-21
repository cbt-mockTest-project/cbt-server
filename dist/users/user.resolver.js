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
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const role_decorators_1 = require("../auth/role.decorators");
const output_dto_1 = require("../common/dtos/output.dto");
const EmailVerification_dto_1 = require("./dtos/EmailVerification.dto");
const changePasswordAfterVerifying_dto_1 = require("./dtos/changePasswordAfterVerifying.dto");
const checkPassword_dto_1 = require("./dtos/checkPassword.dto");
const createFeedback_dto_1 = require("./dtos/createFeedback.dto");
const editProfile_dto_1 = require("./dtos/editProfile.dto");
const kakaoLogin_dto_1 = require("./dtos/kakaoLogin.dto");
const login_dto_1 = require("./dtos/login.dto");
const me_dto_1 = require("./dtos/me.dto");
const register_dto_1 = require("./dtos/register.dto");
const restoreUser_dto_1 = require("./dtos/restoreUser.dto");
const searchUser_dto_1 = require("./dtos/searchUser.dto");
const sendFindPasswordMail_dto_1 = require("./dtos/sendFindPasswordMail.dto");
const sendVerificationMail_dto_1 = require("./dtos/sendVerificationMail.dto");
const updateAdblockPermission_dto_1 = require("./dtos/updateAdblockPermission.dto");
const userProfile_dto_1 = require("./dtos/userProfile.dto");
const user_entity_1 = require("./entities/user.entity");
const user_service_1 = require("./user.service");
const checkUserRole_dto_1 = require("./dtos/checkUserRole.dto");
const changeClientRole_dto_1 = require("./dtos/changeClientRole.dto");
const changeClientRoleAndCreatePayment_dto_1 = require("./dtos/changeClientRoleAndCreatePayment.dto");
const createUserRole_dto_1 = require("./dtos/createUserRole.dto");
const deleteUserRole_dto_1 = require("./dtos/deleteUserRole.dto");
const createFreeTrialRole_dto_1 = require("./dtos/createFreeTrialRole.dto");
const getRoleCount_1 = require("./dtos/getRoleCount");
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
    async createFeedback(createFeedback, user) {
        return this.userService.createFeedback(createFeedback, user);
    }
    async kakaoLogin(kakaoLoginInput, context) {
        const res = context.req.res;
        return this.userService.kakaoLogin(kakaoLoginInput, res);
    }
    async searchUser(searchUserInput) {
        return this.userService.searchUser(searchUserInput);
    }
    async updateAdBlockPermission(updateAdBlockPermissionInput) {
        return this.userService.updateAdBlockPermission(updateAdBlockPermissionInput);
    }
    async checkUserRole(checkUserRoleInput, user) {
        return this.userService.checkUserRole(checkUserRoleInput, user);
    }
    async changeClientRole(changeClientRoleInput, user) {
        return this.userService.changeClientRole(changeClientRoleInput, user);
    }
    async changeClientRoleAndCreatePayment(changeClientRoleAndCreatePaymentInput, user) {
        return this.userService.changeClientRoleAndCreatePayment(user, changeClientRoleAndCreatePaymentInput);
    }
    async createUserRole(createUserRoleInput) {
        return this.userService.createUserRole(createUserRoleInput);
    }
    async deleteUserRole(deleteUserRoleInput) {
        return this.userService.deleteUserRole(deleteUserRoleInput);
    }
    async createFreeTrialRole(user) {
        return this.userService.createFreeTrialRole(user);
    }
    async syncRole() {
        return this.userService.syncRole();
    }
    async getRoleCount(getRoleCountInput) {
        return this.userService.getRoleCount(getRoleCountInput);
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
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => createFeedback_dto_1.CreateFeedbackOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createFeedback_dto_1.CreateFeedbackInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createFeedback", null);
__decorate([
    (0, graphql_1.Mutation)(() => kakaoLogin_dto_1.KakaoLoginOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakaoLogin_dto_1.KakaoLoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "kakaoLogin", null);
__decorate([
    (0, role_decorators_1.Role)(['ADMIN', 'PARTNER']),
    (0, graphql_1.Query)(() => searchUser_dto_1.SearchUserOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchUser_dto_1.SearchUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "searchUser", null);
__decorate([
    (0, role_decorators_1.Role)(['ADMIN', 'PARTNER']),
    (0, graphql_1.Mutation)(() => updateAdblockPermission_dto_1.UpdateAdblockPermissionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateAdblockPermission_dto_1.UpdateAdblockPermissionInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateAdBlockPermission", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => checkUserRole_dto_1.CheckUserRoleOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkUserRole_dto_1.CheckUserRoleInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "checkUserRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => output_dto_1.CoreOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changeClientRole_dto_1.ChangeClientRoleInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changeClientRole", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => changeClientRoleAndCreatePayment_dto_1.ChangeClientRoleAndCreatePaymentOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changeClientRoleAndCreatePayment_dto_1.ChangeClientRoleAndCreatePaymentInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changeClientRoleAndCreatePayment", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => createUserRole_dto_1.CreateUserRoleOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserRole_dto_1.CreateUserRoleInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUserRole", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => deleteUserRole_dto_1.DeleteUserRoleOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteUserRole_dto_1.DeleteUserRoleInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUserRole", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => createFreeTrialRole_dto_1.CreateFreeTrialRoleOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createFreeTrialRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => output_dto_1.CoreOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "syncRole", null);
__decorate([
    (0, graphql_1.Query)(() => getRoleCount_1.GetRoleCountOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getRoleCount_1.GetRoleCountInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getRoleCount", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map