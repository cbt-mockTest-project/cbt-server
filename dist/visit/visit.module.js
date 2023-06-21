"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const visit_entity_1 = require("./entities/visit.entity");
const visit_resolver_1 = require("./visit.resolver");
const visit_service_1 = require("./visit.service");
const visitHistory_entity_1 = require("./entities/visitHistory.entity");
let VisitModule = class VisitModule {
};
VisitModule = __decorate([
    (0, common_1.Module)({
        providers: [visit_resolver_1.VisitResolver, visit_service_1.VisitService],
        imports: [typeorm_1.TypeOrmModule.forFeature([visit_entity_1.Visit, visitHistory_entity_1.VisitHistory])],
        exports: [visit_service_1.VisitService],
    })
], VisitModule);
exports.VisitModule = VisitModule;
//# sourceMappingURL=visit.module.js.map