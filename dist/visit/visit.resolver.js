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
exports.VisitResolver = void 0;
const createVisitHistory_dto_1 = require("./dtos/createVisitHistory.dto");
const user_entity_1 = require("./../users/entities/user.entity");
const auth_user_decorator_1 = require("./../auth/auth-user.decorator");
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../common/dtos/output.dto");
const visit_entity_1 = require("./entities/visit.entity");
const visit_service_1 = require("./visit.service");
const readVisitCount_dto_1 = require("./dtos/readVisitCount.dto");
const readVisitHistory_dto_1 = require("./dtos/readVisitHistory.dto");
let VisitResolver = class VisitResolver {
    constructor(visitService) {
        this.visitService = visitService;
    }
    async createVisit(user) {
        return this.visitService.createVisit(user);
    }
    async readVisitCount() {
        return this.visitService.readVisitCount();
    }
    async createVisitHistory() {
        return this.visitService.createVisitHistory();
    }
    async readVisitHistory() {
        return this.visitService.readVisitHistory();
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => output_dto_1.CoreOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "createVisit", null);
__decorate([
    (0, graphql_1.Query)(() => readVisitCount_dto_1.ReadVisitCountOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "readVisitCount", null);
__decorate([
    (0, graphql_1.Mutation)(() => createVisitHistory_dto_1.CreateVisitHistoryOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "createVisitHistory", null);
__decorate([
    (0, graphql_1.Query)(() => readVisitHistory_dto_1.ReadVisitHistoryOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "readVisitHistory", null);
VisitResolver = __decorate([
    (0, graphql_1.Resolver)(() => visit_entity_1.Visit),
    __metadata("design:paramtypes", [visit_service_1.VisitService])
], VisitResolver);
exports.VisitResolver = VisitResolver;
//# sourceMappingURL=visit.resolver.js.map