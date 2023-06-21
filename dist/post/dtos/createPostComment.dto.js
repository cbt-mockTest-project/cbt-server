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
exports.CreatePostCommentOutput = exports.CreatePostCommentInput = void 0;
const postComment_entity_1 = require("./../entities/postComment.entity");
const output_dto_1 = require("../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let CreatePostCommentInput = class CreatePostCommentInput extends (0, graphql_1.PickType)(postComment_entity_1.PostComment, ['content']) {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], CreatePostCommentInput.prototype, "postId", void 0);
CreatePostCommentInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePostCommentInput);
exports.CreatePostCommentInput = CreatePostCommentInput;
let CreatePostCommentOutput = class CreatePostCommentOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => postComment_entity_1.PostComment),
    __metadata("design:type", postComment_entity_1.PostComment)
], CreatePostCommentOutput.prototype, "comment", void 0);
CreatePostCommentOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreatePostCommentOutput);
exports.CreatePostCommentOutput = CreatePostCommentOutput;
//# sourceMappingURL=createPostComment.dto.js.map