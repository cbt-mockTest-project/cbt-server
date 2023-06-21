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
exports.ZepMapController = void 0;
const common_1 = require("@nestjs/common");
const zepMap_service_1 = require("./zepMap.service");
const updateZepMapUserCount_1 = require("./dtos/zepMap/updateZepMapUserCount");
let ZepMapController = class ZepMapController {
    constructor(zepMapService) {
        this.zepMapService = zepMapService;
    }
    async getZepMapUserCount() {
        return this.zepMapService.getZepMapUserCount();
    }
    async updateZepMapUserCount(updateZepMapUserCountInpt) {
        return this.zepMapService.updateZepMapUserCount(updateZepMapUserCountInpt);
    }
};
__decorate([
    (0, common_1.Get)('/user-count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ZepMapController.prototype, "getZepMapUserCount", null);
__decorate([
    (0, common_1.Post)('/user-count'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateZepMapUserCount_1.UpdateZepMapUserCountInput]),
    __metadata("design:returntype", Promise)
], ZepMapController.prototype, "updateZepMapUserCount", null);
ZepMapController = __decorate([
    (0, common_1.Controller)('zep/map'),
    __metadata("design:paramtypes", [zepMap_service_1.ZepMapService])
], ZepMapController);
exports.ZepMapController = ZepMapController;
//# sourceMappingURL=zepMap.controller.js.map