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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const attendance_entity_1 = require("./entities/attendance.entity");
const attendance_service_1 = require("./attendance.service");
const createAttendance_dto_1 = require("./dtos/createAttendance.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const role_decorators_1 = require("../auth/role.decorators");
const deleteAttendance_dto_1 = require("./dtos/deleteAttendance.dto");
const getTodayAttendance_dto_1 = require("./dtos/getTodayAttendance.dto");
let AttendanceResolver = class AttendanceResolver {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async createAttendance(user, createAttendanceInput) {
        return this.attendanceService.createAttendance(user, createAttendanceInput);
    }
    async deleteAttendance(user, deleteAttendanceInput) {
        return this.attendanceService.deleteAttendance(user, deleteAttendanceInput);
    }
    async getTodayAttendance() {
        return this.attendanceService.getTodayAttendance();
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => createAttendance_dto_1.CreateAttendanceOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        createAttendance_dto_1.CreateAttendanceInput]),
    __metadata("design:returntype", Promise)
], AttendanceResolver.prototype, "createAttendance", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => deleteAttendance_dto_1.DeleteAttendanceOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        deleteAttendance_dto_1.DeleteAttendanceInput]),
    __metadata("design:returntype", Promise)
], AttendanceResolver.prototype, "deleteAttendance", null);
__decorate([
    (0, graphql_1.Query)(() => getTodayAttendance_dto_1.GetTodayAttendanceOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceResolver.prototype, "getTodayAttendance", null);
AttendanceResolver = __decorate([
    (0, graphql_1.Resolver)(() => attendance_entity_1.Attendance),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceResolver);
exports.AttendanceResolver = AttendanceResolver;
//# sourceMappingURL=attendance.resolver.js.map