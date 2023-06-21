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
exports.ZepUserController = void 0;
const common_1 = require("@nestjs/common");
const zepUser_service_1 = require("./zepUser.service");
const updateZepUser_dto_1 = require("./dtos/zepUser/updateZepUser.dto");
let ZepUserController = class ZepUserController {
    constructor(zepUserService) {
        this.zepUserService = zepUserService;
    }
    async updateZepUser(updateZepUserInput) {
        return this.zepUserService.updateZepUser(updateZepUserInput);
    }
    async getZepUser(id) {
        return this.zepUserService.getZepUser(id);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateZepUser_dto_1.UpdateZepUserInput]),
    __metadata("design:returntype", Promise)
], ZepUserController.prototype, "updateZepUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ZepUserController.prototype, "getZepUser", null);
ZepUserController = __decorate([
    (0, common_1.Controller)('zep/user'),
    __metadata("design:paramtypes", [zepUser_service_1.ZepUserService])
], ZepUserController);
exports.ZepUserController = ZepUserController;
//# sourceMappingURL=zepUser.controller.js.map