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
exports.VideoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const video_entity_1 = require("./entities/video.entity");
const video_service_1 = require("./video.service");
const createVideo_dto_1 = require("./dtos/createVideo.dto");
const role_decorators_1 = require("../auth/role.decorators");
let VideoResolver = class VideoResolver {
    constructor(videoService) {
        this.videoService = videoService;
    }
    async createVideo(createVideoInput) {
        return this.videoService.createVideo(createVideoInput);
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ADMIN']),
    (0, graphql_1.Mutation)(() => createVideo_dto_1.CreateVideoOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createVideo_dto_1.CreateVideoInput]),
    __metadata("design:returntype", Promise)
], VideoResolver.prototype, "createVideo", null);
VideoResolver = __decorate([
    (0, graphql_1.Resolver)(() => video_entity_1.Video),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoResolver);
exports.VideoResolver = VideoResolver;
//# sourceMappingURL=video.resolver.js.map