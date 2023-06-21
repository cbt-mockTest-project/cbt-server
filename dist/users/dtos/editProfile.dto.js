"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileOutput = exports.EditProfileInput = void 0;
const output_dto_1 = require("../../common/dtos/output.dto");
const user_entity_1 = require("../entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
let EditProfileInput = class EditProfileInput extends (0, graphql_1.PickType)((0, graphql_1.PartialType)(user_entity_1.User), [
    'nickname',
    'password',
]) {
};
EditProfileInput = __decorate([
    (0, graphql_1.InputType)()
], EditProfileInput);
exports.EditProfileInput = EditProfileInput;
let EditProfileOutput = class EditProfileOutput extends output_dto_1.CoreOutput {
};
EditProfileOutput = __decorate([
    (0, graphql_1.ObjectType)()
], EditProfileOutput);
exports.EditProfileOutput = EditProfileOutput;
//# sourceMappingURL=editProfile.dto.js.map