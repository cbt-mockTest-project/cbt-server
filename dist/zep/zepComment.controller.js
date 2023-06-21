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
exports.ZepCommentController = void 0;
const common_1 = require("@nestjs/common");
const zepComment_service_1 = require("./zepComment.service");
const createZepComment_dto_1 = require("./dtos/zepComment/createZepComment.dto");
const updateZepComment_dto_1 = require("./dtos/zepComment/updateZepComment.dto");
const deleteZepComment_dto_1 = require("./dtos/zepComment/deleteZepComment.dto");
let ZepCommentController = class ZepCommentController {
    constructor(zepCommentService) {
        this.zepCommentService = zepCommentService;
    }
    async createZepComment(createZepCommentInput) {
        return this.zepCommentService.createZepComment(createZepCommentInput);
    }
    async updateZepComment(updateZepCommentInput, id) {
        return this.zepCommentService.updateZepComment(id, updateZepCommentInput);
    }
    async deleteZepComment(id, deleteZepCommentInput) {
        return this.zepCommentService.deleteZepComment(id, deleteZepCommentInput);
    }
};
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createZepComment_dto_1.CreateZepCommentInput]),
    __metadata("design:returntype", Promise)
], ZepCommentController.prototype, "createZepComment", null);
__decorate([
    (0, common_1.Post)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateZepComment_dto_1.UpdateZepCommentInput, String]),
    __metadata("design:returntype", Promise)
], ZepCommentController.prototype, "updateZepComment", null);
__decorate([
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deleteZepComment_dto_1.DeleteZepCommentInput]),
    __metadata("design:returntype", Promise)
], ZepCommentController.prototype, "deleteZepComment", null);
ZepCommentController = __decorate([
    (0, common_1.Controller)('zep/comment'),
    __metadata("design:paramtypes", [zepComment_service_1.ZepCommentService])
], ZepCommentController);
exports.ZepCommentController = ZepCommentController;
//# sourceMappingURL=zepComment.controller.js.map