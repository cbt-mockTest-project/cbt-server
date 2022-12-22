"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const feedback_entity_1 = require("./users/entities/feedback.entity");
const mail_module_1 = require("./mail/mail.module");
const mock_exam_question_feedback_entity_1 = require("./mock-exams/entities/mock-exam-question-feedback.entity");
const mock_exam_question_entity_1 = require("./mock-exams/entities/mock-exam-question.entity");
const mock_exam_category_entity_1 = require("./mock-exams/entities/mock-exam-category.entity");
const user_entity_1 = require("./users/entities/user.entity");
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const Joi = require("joi");
const schedule_1 = require("@nestjs/schedule");
const user_module_1 = require("./users/user.module");
const jwt_module_1 = require("./jwt/jwt.module");
const auth_module_1 = require("./auth/auth.module");
const mock_exams_module_1 = require("./mock-exams/mock-exams.module");
const mock_exam_entity_1 = require("./mock-exams/entities/mock-exam.entity");
const uploads_module_1 = require("./uploads/uploads.module");
const mock_exam_question_state_entity_1 = require("./mock-exams/entities/mock-exam-question-state.entity");
const scheduler_module_1 = require("./scheduler/scheduler.module");
const verification_entity_1 = require("./users/entities/verification.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env.prod',
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.string().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_NAME: Joi.string().required(),
                    PRIVATE_KEY: Joi.string().required(),
                }),
            }),
            schedule_1.ScheduleModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                sortSchema: true,
                cors: {
                    credentials: true,
                    origin: process.env.CLIENT_URL,
                },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                synchronize: process.env.NODE_ENV !== 'prod',
                logging: false,
                entities: [
                    user_entity_1.User,
                    verification_entity_1.Verification,
                    mock_exam_entity_1.MockExam,
                    mock_exam_category_entity_1.MockExamCategory,
                    mock_exam_question_entity_1.MockExamQuestion,
                    mock_exam_question_feedback_entity_1.MockExamQuestionFeedback,
                    mock_exam_question_state_entity_1.MockExamQuestionState,
                    feedback_entity_1.Feedback,
                ],
            }),
            user_module_1.UserModule,
            jwt_module_1.JwtModule.forRoot({
                privateKey: process.env.PRIVATE_KEY,
            }),
            auth_module_1.AuthModule,
            mock_exams_module_1.MockExamsModule,
            uploads_module_1.UploadsModule,
            scheduler_module_1.SchedulerModule,
            mail_module_1.MailModule,
            mailer_1.MailerModule.forRoot({
                transport: `smtps://${process.env.EMAIL_AUTH_EMAIL}:${process.env.EMAIL_AUTH_PASSWORD}@${process.env.EMAIL_HOST}`,
                defaults: {
                    from: `"${process.env.EMAIL_FROM_USER_NAME}" <${process.env.EMAIL_AUTH_EMAIL}>`,
                },
                preview: false,
                template: {
                    dir: (0, path_1.join)(__dirname, 'templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map