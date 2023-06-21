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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let AttendanceService = class AttendanceService {
    constructor(attendance, user) {
        this.attendance = attendance;
        this.user = user;
    }
    async createAttendance(user, createAttendanceInput) {
        try {
            const { content } = createAttendanceInput;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const todayAttendance = await this.attendance.findOne({
                where: {
                    created_at: (0, typeorm_2.Between)(today, tomorrow),
                    user: {
                        id: user.id,
                    },
                },
                relations: {
                    user: true,
                },
            });
            if (todayAttendance) {
                return {
                    ok: false,
                    error: '이미 출석을 하셨습니다.',
                };
            }
            const newAttendance = this.attendance.create({
                content,
                user,
            });
            const attendance = await this.attendance.save(newAttendance);
            return {
                ok: true,
                attendance,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: '출석을 할 수 없습니다.',
            };
        }
    }
    async deleteAttendance(user, deleteAttendanceInput) {
        try {
            const { id } = deleteAttendanceInput;
            const attendance = await this.attendance.findOne({
                where: {
                    id: id,
                    user: {
                        id: user.id,
                    },
                },
            });
            if (!attendance) {
                return {
                    ok: false,
                    error: '존재하지 않는 출석입니다.',
                };
            }
            await this.attendance.delete(id);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '출석을 삭제할 수 없습니다.',
            };
        }
    }
    async getTodayAttendance() {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const todayAttendance = await this.attendance.find({
                where: {
                    created_at: (0, typeorm_2.Between)(today, tomorrow),
                },
                relations: {
                    user: true,
                },
            });
            return {
                ok: true,
                attendances: todayAttendance,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '출석을 불러올 수 없습니다.',
            };
        }
    }
    async getAttendance(getAttendanceInput) {
        const { date: { year, month, day }, } = getAttendanceInput;
        const date = new Date(year, month - 1, day);
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        const attendances = await this.attendance.find({
            where: {
                created_at: (0, typeorm_2.Between)(date, nextDate),
            },
            relations: {
                user: true,
            },
        });
        return {
            ok: true,
            attendances,
        };
    }
};
AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AttendanceService);
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map