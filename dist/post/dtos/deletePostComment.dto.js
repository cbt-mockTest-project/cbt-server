"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostCommentOutput = exports.DeletePostCommentInput = void 0;
const postComment_entity_1 = require("./../entities/postComment.entity");
const output_dto_1 = require("../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let DeletePostCommentInput = class DeletePostCommentInput extends (0, graphql_1.PickType)(postComment_entity_1.PostComment, ['id']) {
};
DeletePostCommentInput = __decorate([
    (0, graphql_1.InputType)()
], DeletePostCommentInput);
exports.DeletePostCommentInput = DeletePostCommentInput;
let DeletePostCommentOutput = class DeletePostCommentOutput extends output_dto_1.CoreOutput {
};
DeletePostCommentOutput = __decorate([
    (0, graphql_1.ObjectType)()
], DeletePostCommentOutput);
exports.DeletePostCommentOutput = DeletePostCommentOutput;
//# sourceMappingURL=deletePostComment.dto.js.map