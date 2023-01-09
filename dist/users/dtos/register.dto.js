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
exports.RegisterOutput = exports.RegisterInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const user_entity_1 = require("./../entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
let RegisterInput = class RegisterInput extends (0, graphql_1.PickType)(user_entity_1.User, ['password', 'nickname']) {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RegisterInput.prototype, "code", void 0);
RegisterInput = __decorate([
    (0, graphql_1.InputType)()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let RegisterOutput = class RegisterOutput extends output_dto_1.CoreOutput {
};
RegisterOutput = __decorate([
    (0, graphql_1.ObjectType)()
], RegisterOutput);
exports.RegisterOutput = RegisterOutput;
//# sourceMappingURL=register.dto.js.map