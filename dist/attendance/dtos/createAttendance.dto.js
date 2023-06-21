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
exports.CreateAttendanceOutput = exports.CreateAttendanceInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const attendance_entity_1 = require("../entities/attendance.entity");
let CreateAttendanceInput = class CreateAttendanceInput extends (0, graphql_1.PickType)(attendance_entity_1.Attendance, ['content']) {
};
CreateAttendanceInput = __decorate([
    (0, graphql_1.InputType)()
], CreateAttendanceInput);
exports.CreateAttendanceInput = CreateAttendanceInput;
let CreateAttendanceOutput = class CreateAttendanceOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => attendance_entity_1.Attendance, { nullable: true }),
    __metadata("design:type", attendance_entity_1.Attendance)
], CreateAttendanceOutput.prototype, "attendance", void 0);
CreateAttendanceOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateAttendanceOutput);
exports.CreateAttendanceOutput = CreateAttendanceOutput;
//# sourceMappingURL=createAttendance.dto.js.map