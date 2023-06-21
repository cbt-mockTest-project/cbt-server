"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostOutput = exports.DeletePostInput = void 0;
const output_dto_1 = require("../../common/dtos/output.dto");
const post_entity_1 = require("../entities/post.entity");
const graphql_1 = require("@nestjs/graphql");
let DeletePostInput = class DeletePostInput extends (0, graphql_1.PickType)(post_entity_1.Post, ['id']) {
};
DeletePostInput = __decorate([
    (0, graphql_1.InputType)()
], DeletePostInput);
exports.DeletePostInput = DeletePostInput;
let DeletePostOutput = class DeletePostOutput extends output_dto_1.CoreOutput {
};
DeletePostOutput = __decorate([
    (0, graphql_1.ObjectType)()
], DeletePostOutput);
exports.DeletePostOutput = DeletePostOutput;
//# sourceMappingURL=deletePost.dto.js.map