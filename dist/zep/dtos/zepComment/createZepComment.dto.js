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
exports.CreateZepCommentOutput = exports.CreateZepCommentInput = void 0;
const class_validator_1 = require("class-validator");
const output_dto_1 = require("../../../common/dtos/output.dto");
const zepComment_entity_1 = require("../../entities/zepComment.entity");
class CreateZepCommentInput {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateZepCommentInput.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateZepCommentInput.prototype, "postId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateZepCommentInput.prototype, "content", void 0);
exports.CreateZepCommentInput = CreateZepCommentInput;
class CreateZepCommentOutput extends output_dto_1.CoreOutput {
    constructor() {
        super(...arguments);
        this.comment = null;
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", zepComment_entity_1.ZepComment)
], CreateZepCommentOutput.prototype, "comment", void 0);
exports.CreateZepCommentOutput = CreateZepCommentOutput;
//# sourceMappingURL=createZepComment.dto.js.map