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
exports.SchedulerService = void 0;
const mock_exam_question_entity_1 = require("./../mock-exams/entities/mock-exam-question.entity");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const AWS = require("aws-sdk");
const utils_1 = require("../utils/utils");
const typeorm_2 = require("typeorm");
let SchedulerService = class SchedulerService {
    constructor(mockExamQuestions, configService) {
        this.mockExamQuestions = mockExamQuestions;
        this.configService = configService;
    }
    async clearS3() {
        const BUCKET_NAME = this.configService.get('AWS_BUCKEY_NAME');
        AWS.config.update({
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
                secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
            },
        });
        let awsListKeys;
        let examImageList = [];
        (await this.mockExamQuestions.find()).map((question) => {
            examImageList = examImageList.concat(question.question_img, question.solution_img);
            return;
        });
        examImageList = examImageList.map((image) => image.url.split('https://cbteungwangnestjs961203.s3.amazonaws.com/')[1]);
        const s3Client = new AWS.S3();
        await s3Client
            .listObjects({ Bucket: BUCKET_NAME }, function (err, data) {
            if (err) {
                console.log('Error', err);
            }
            else {
                awsListKeys = data.Contents.map((el) => el.Key);
            }
        })
            .promise();
        const imageListForDelete = (0, utils_1.findUniqElem)(awsListKeys, examImageList);
        imageListForDelete.map(async (key) => {
            await s3Client
                .deleteObject({ Bucket: BUCKET_NAME, Key: String(key) }, (err, data) => {
                if (err) {
                    throw err;
                }
            })
                .promise();
        });
        console.log('s3 clean up');
    }
};
__decorate([
    (0, schedule_1.Cron)('0 30 2 * * 1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "clearS3", null);
SchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], SchedulerService);
exports.SchedulerService = SchedulerService;
//# sourceMappingURL=scheduler.service.js.map