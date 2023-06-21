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
exports.GetZepPostsOutput = exports.GetZepPostsInput = void 0;
const class_validator_1 = require("class-validator");
const output_dto_1 = require("../../../common/dtos/output.dto");
const zepPost_entity_1 = require("../../entities/zepPost.entity");
class GetZepPostsInput {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetZepPostsInput.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetZepPostsInput.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetZepPostsInput.prototype, "limit", void 0);
exports.GetZepPostsInput = GetZepPostsInput;
class GetZepPostsOutput extends output_dto_1.CoreOutput {
    constructor() {
        super(...arguments);
        this.posts = [];
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], GetZepPostsOutput.prototype, "posts", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetZepPostsOutput.prototype, "total", void 0);
exports.GetZepPostsOutput = GetZepPostsOutput;
//# sourceMappingURL=getZepPosts.dto.js.map