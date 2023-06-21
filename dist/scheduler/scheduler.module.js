"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerModule = void 0;
const mock_exam_question_entity_1 = require("./../mock-exams/entities/mock-exam-question.entity");
const typeorm_1 = require("@nestjs/typeorm");
const scheduler_service_1 = require("./scheduler.service");
const common_1 = require("@nestjs/common");
const visit_service_1 = require("../visit/visit.service");
const visit_entity_1 = require("../visit/entities/visit.entity");
const visitHistory_entity_1 = require("../visit/entities/visitHistory.entity");
const user_service_1 = require("../users/user.service");
const user_entity_1 = require("../users/entities/user.entity");
const verification_entity_1 = require("../users/entities/verification.entity");
const feedback_entity_1 = require("../users/entities/feedback.entity");
const userAndRole_entity_1 = require("../users/entities/userAndRole.entity");
const role_entity_1 = require("../users/entities/role.entity");
const notice_service_1 = require("../users/notice.service");
const payment_service_1 = require("../payments/payment.service");
const notice_entity_1 = require("../users/entities/notice.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
let SchedulerModule = class SchedulerModule {
};
SchedulerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                mock_exam_question_entity_1.MockExamQuestion,
                visit_entity_1.Visit,
                visitHistory_entity_1.VisitHistory,
                user_entity_1.User,
                verification_entity_1.Verification,
                feedback_entity_1.Feedback,
                userAndRole_entity_1.UserAndRole,
                role_entity_1.Role,
                notice_entity_1.Notice,
                payment_entity_1.Payment,
            ]),
        ],
        providers: [
            scheduler_service_1.SchedulerService,
            visit_service_1.VisitService,
            user_service_1.UserService,
            notice_service_1.NoticeService,
            payment_service_1.PaymentService,
        ],
    })
], SchedulerModule);
exports.SchedulerModule = SchedulerModule;
//# sourceMappingURL=scheduler.module.js.map