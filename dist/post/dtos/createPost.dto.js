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
exports.CreatePostOutput = exports.CreatePostInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const post_entity_1 = require("./../entities/post.entity");
const graphql_1 = require("@nestjs/graphql");
let CreatePostInput = class CreatePostInput extends (0, graphql_1.PickType)(post_entity_1.Post, ['content', 'title']) {
};
__decorate([
    (0, graphql_1.Field)(() => post_entity_1.PostCategory, { nullable: true }),
    __metadata("design:type", String)
], CreatePostInput.prototype, "category", void 0);
CreatePostInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePostInput);
exports.CreatePostInput = CreatePostInput;
let CreatePostOutput = class CreatePostOutput extends output_dto_1.CoreOutput {
};
CreatePostOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreatePostOutput);
exports.CreatePostOutput = CreatePostOutput;
//# sourceMappingURL=createPost.dto.js.map