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
exports.ReadPostsOutput = exports.ReadPostsInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const post_entity_1 = require("./../entities/post.entity");
const graphql_1 = require("@nestjs/graphql");
let ReadPostsInput = class ReadPostsInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ReadPostsInput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ReadPostsInput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => post_entity_1.PostCategory, { nullable: true }),
    __metadata("design:type", String)
], ReadPostsInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], ReadPostsInput.prototype, "all", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ReadPostsInput.prototype, "search", void 0);
ReadPostsInput = __decorate([
    (0, graphql_1.InputType)()
], ReadPostsInput);
exports.ReadPostsInput = ReadPostsInput;
let ReadPostsOutput = class ReadPostsOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [post_entity_1.Post], { nullable: true }),
    __metadata("design:type", Array)
], ReadPostsOutput.prototype, "posts", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], ReadPostsOutput.prototype, "count", void 0);
ReadPostsOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ReadPostsOutput);
exports.ReadPostsOutput = ReadPostsOutput;
//# sourceMappingURL=readPosts.dto.js.map