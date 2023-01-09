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
exports.UserProfileOutput = exports.UserProfileInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const user_entity_1 = require("./../entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
let UserProfileInput = class UserProfileInput extends (0, graphql_1.PickType)(user_entity_1.User, ['id']) {
};
UserProfileInput = __decorate([
    (0, graphql_1.InputType)()
], UserProfileInput);
exports.UserProfileInput = UserProfileInput;
let UserProfileOutput = class UserProfileOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], UserProfileOutput.prototype, "user", void 0);
UserProfileOutput = __decorate([
    (0, graphql_1.ObjectType)()
], UserProfileOutput);
exports.UserProfileOutput = UserProfileOutput;
//# sourceMappingURL=userProfile.dto.js.map