"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideoOutput = exports.CreateVideoInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const video_entity_1 = require("../entities/video.entity");
let CreateVideoInput = class CreateVideoInput extends (0, graphql_1.PickType)(video_entity_1.Video, ['size', 'url']) {
};
CreateVideoInput = __decorate([
    (0, graphql_1.InputType)()
], CreateVideoInput);
exports.CreateVideoInput = CreateVideoInput;
let CreateVideoOutput = class CreateVideoOutput extends output_dto_1.CoreOutput {
};
CreateVideoOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateVideoOutput);
exports.CreateVideoOutput = CreateVideoOutput;
//# sourceMappingURL=createVideo.dto.js.map