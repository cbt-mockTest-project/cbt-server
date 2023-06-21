"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const notice_resolver_1 = require("./notice.resolver");
const feedback_entity_1 = require("./entities/feedback.entity");
const verification_entity_1 = require("./entities/verification.entity");
const user_service_1 = require("./user.service");
const user_resolver_1 = require("./user.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const notice_entity_1 = require("./entities/notice.entity");
const notice_service_1 = require("./notice.service");
const user_controller_1 = require("./user.controller");
const payment_service_1 = require("../payments/payment.service");
const payment_entity_1 = require("../payments/entities/payment.entity");
const userAndRole_entity_1 = require("./entities/userAndRole.entity");
const role_entity_1 = require("./entities/role.entity");
const mock_exam_category_entity_1 = require("../mock-exams/entities/mock-exam-category.entity");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                verification_entity_1.Verification,
                feedback_entity_1.Feedback,
                notice_entity_1.Notice,
                payment_entity_1.Payment,
                userAndRole_entity_1.UserAndRole,
                role_entity_1.Role,
                mock_exam_category_entity_1.ExamCategoryRole,
                mock_exam_category_entity_1.MockExamCategory,
            ]),
        ],
        providers: [
            user_resolver_1.UserResolver,
            user_service_1.UserService,
            notice_resolver_1.NoticeResolver,
            notice_service_1.NoticeService,
            payment_service_1.PaymentService,
        ],
        exports: [user_service_1.UserService, notice_service_1.NoticeService],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map