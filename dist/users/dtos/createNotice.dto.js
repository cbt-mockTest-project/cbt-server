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
exports.CreateNoticeOutput = exports.CreateNoticeInput = void 0;
const output_dto_1 = require("../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
const notice_entity_1 = require("../entities/notice.entity");
let CreateNoticeInput = class CreateNoticeInput extends (0, graphql_1.PickType)(notice_entity_1.Notice, [
    'content',
    'reservationTime',
    'link',
]) {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], CreateNoticeInput.prototype, "userId", void 0);
CreateNoticeInput = __decorate([
    (0, graphql_1.InputType)()
], CreateNoticeInput);
exports.CreateNoticeInput = CreateNoticeInput;
let CreateNoticeOutput = class CreateNoticeOutput extends output_dto_1.CoreOutput {
};
CreateNoticeOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateNoticeOutput);
exports.CreateNoticeOutput = CreateNoticeOutput;
//# sourceMappingURL=createNotice.dto.js.map