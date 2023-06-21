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
exports.ZepPostController = void 0;
const common_1 = require("@nestjs/common");
const zepPost_service_1 = require("./zepPost.service");
const createZepPost_dto_1 = require("./dtos/zepPost/createZepPost.dto");
const getZepPosts_dto_1 = require("./dtos/zepPost/getZepPosts.dto");
const updateZepPost_dto_1 = require("./dtos/zepPost/updateZepPost.dto");
const deleteZepPost_dto_1 = require("./dtos/zepPost/deleteZepPost.dto");
let ZepPostController = class ZepPostController {
    constructor(zepPostService) {
        this.zepPostService = zepPostService;
    }
    async createZepPost(createZepPostInput) {
        return this.zepPostService.createZepPost(createZepPostInput);
    }
    async getZepPosts(getZepPostsInput) {
        return this.zepPostService.getZepPosts(getZepPostsInput);
    }
    async getZepPost(id) {
        return this.zepPostService.getZepPost(id);
    }
    async updateZepPost(id, updateZepPostInput) {
        return this.zepPostService.updateZepPost(id, updateZepPostInput);
    }
    async deleteZepPost(deleteZepPostInput, id) {
        return this.zepPostService.deleteZepPost(id, deleteZepPostInput);
    }
};
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createZepPost_dto_1.CreateZepPostInput]),
    __metadata("design:returntype", Promise)
], ZepPostController.prototype, "createZepPost", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getZepPosts_dto_1.GetZepPostsInput]),
    __metadata("design:returntype", Promise)
], ZepPostController.prototype, "getZepPosts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ZepPostController.prototype, "getZepPost", null);
__decorate([
    (0, common_1.Post)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateZepPost_dto_1.UpdateZepPostInput]),
    __metadata("design:returntype", Promise)
], ZepPostController.prototype, "updateZepPost", null);
__decorate([
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteZepPost_dto_1.DeleteZepPostInput, String]),
    __metadata("design:returntype", Promise)
], ZepPostController.prototype, "deleteZepPost", null);
ZepPostController = __decorate([
    (0, common_1.Controller)('zep/post'),
    __metadata("design:paramtypes", [zepPost_service_1.ZepPostService])
], ZepPostController);
exports.ZepPostController = ZepPostController;
//# sourceMappingURL=zepPost.controller.js.map