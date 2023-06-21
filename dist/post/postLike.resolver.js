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
exports.PostLikeResolver = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const editPostLike_dto_1 = require("./dtos/editPostLike.dto");
const postLike_service_1 = require("./postLike.service");
const postLike_entity_1 = require("./entities/postLike.entity");
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const role_decorators_1 = require("../auth/role.decorators");
let PostLikeResolver = class PostLikeResolver {
    constructor(postLikeService) {
        this.postLikeService = postLikeService;
    }
    async editPostLike(editPostLikeInput, user) {
        return this.postLikeService.editPostLike(editPostLikeInput, user);
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => editPostLike_dto_1.EditPostLikeOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editPostLike_dto_1.EditPostLikeInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostLikeResolver.prototype, "editPostLike", null);
PostLikeResolver = __decorate([
    (0, graphql_1.Resolver)(() => postLike_entity_1.PostLike),
    __metadata("design:paramtypes", [postLike_service_1.PostLikeService])
], PostLikeResolver);
exports.PostLikeResolver = PostLikeResolver;
//# sourceMappingURL=postLike.resolver.js.map