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
exports.NoticeResolver = void 0;
const output_dto_1 = require("../common/dtos/output.dto");
const user_entity_1 = require("./entities/user.entity");
const deleteNotice_dto_1 = require("./dtos/deleteNotice.dto");
const createNotice_dto_1 = require("./dtos/createNotice.dto");
const notice_entity_1 = require("./entities/notice.entity");
const graphql_1 = require("@nestjs/graphql");
const notice_service_1 = require("./notice.service");
const role_decorators_1 = require("../auth/role.decorators");
const editNotice_dto_1 = require("./dtos/editNotice.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
let NoticeResolver = class NoticeResolver {
    constructor(noticeService) {
        this.noticeService = noticeService;
    }
    async createNotice(createNoticeInput) {
        return this.noticeService.createNotice(createNoticeInput);
    }
    async editNotice(editNoticeInput) {
        return this.noticeService.editNotice(editNoticeInput);
    }
    async deleteNotice(deleteNoticeInput) {
        return this.noticeService.deleteNotice(deleteNoticeInput);
    }
    async deleteAllNoticesOfMe(user) {
        return this.noticeService.deleteAllNoticesOfMe(user);
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ADMIN']),
    (0, graphql_1.Mutation)(() => createNotice_dto_1.CreateNoticeOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createNotice_dto_1.CreateNoticeInput]),
    __metadata("design:returntype", Promise)
], NoticeResolver.prototype, "createNotice", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => editNotice_dto_1.EditNoticeOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editNotice_dto_1.EditNoticeInput]),
    __metadata("design:returntype", Promise)
], NoticeResolver.prototype, "editNotice", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => deleteNotice_dto_1.DeleteNoticeOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteNotice_dto_1.DeleteNoticeInput]),
    __metadata("design:returntype", Promise)
], NoticeResolver.prototype, "deleteNotice", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => output_dto_1.CoreOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], NoticeResolver.prototype, "deleteAllNoticesOfMe", null);
NoticeResolver = __decorate([
    (0, graphql_1.Resolver)(() => notice_entity_1.Notice),
    __metadata("design:paramtypes", [notice_service_1.NoticeService])
], NoticeResolver);
exports.NoticeResolver = NoticeResolver;
//# sourceMappingURL=notice.resolver.js.map