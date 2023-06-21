"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZepModule = void 0;
const common_1 = require("@nestjs/common");
const zep_controller_1 = require("./zep.controller");
const zep_service_1 = require("./zep.service");
const typeorm_1 = require("@nestjs/typeorm");
const mock_exam_question_entity_1 = require("../mock-exams/entities/mock-exam-question.entity");
const zepUser_entity_1 = require("./entities/zepUser.entity");
const zepStudyTime_entity_1 = require("./entities/zepStudyTime.entity");
const zepUser_controller_1 = require("./zepUser.controller");
const zepUser_service_1 = require("./zepUser.service");
const zepStudyTime_controller_1 = require("./zepStudyTime.controller");
const zepStudyTime_service_1 = require("./zepStudyTime.service");
const zepMapUserCount_entity_1 = require("./entities/zepMapUserCount.entity");
const zepMap_controller_1 = require("./zepMap.controller");
const zepMap_service_1 = require("./zepMap.service");
const zepPost_entity_1 = require("./entities/zepPost.entity");
const zepComment_entity_1 = require("./entities/zepComment.entity");
const zepPost_controller_1 = require("./zepPost.controller");
const zepPost_service_1 = require("./zepPost.service");
const zepComment_controller_1 = require("./zepComment.controller");
const zepComment_service_1 = require("./zepComment.service");
let ZepModule = class ZepModule {
};
ZepModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                mock_exam_question_entity_1.MockExamQuestion,
                zepUser_entity_1.ZepUser,
                zepStudyTime_entity_1.ZepStudyTime,
                zepMapUserCount_entity_1.ZepMapUserCount,
                zepPost_entity_1.ZepPost,
                zepComment_entity_1.ZepComment,
            ]),
        ],
        controllers: [
            zep_controller_1.ZepController,
            zepUser_controller_1.ZepUserController,
            zepStudyTime_controller_1.ZepStudyTimeController,
            zepMap_controller_1.ZepMapController,
            zepPost_controller_1.ZepPostController,
            zepComment_controller_1.ZepCommentController,
        ],
        providers: [
            zep_controller_1.ZepController,
            zep_service_1.ZepService,
            zepUser_controller_1.ZepUserController,
            zepUser_service_1.ZepUserService,
            zepStudyTime_controller_1.ZepStudyTimeController,
            zepStudyTime_service_1.ZepStudyTimeService,
            zepMap_service_1.ZepMapService,
            zepMap_controller_1.ZepMapController,
            zepPost_controller_1.ZepPostController,
            zepPost_service_1.ZepPostService,
            zepComment_controller_1.ZepCommentController,
            zepComment_service_1.ZepCommentService,
        ],
    })
], ZepModule);
exports.ZepModule = ZepModule;
//# sourceMappingURL=zep.module.js.map