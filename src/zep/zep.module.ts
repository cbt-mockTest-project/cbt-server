import { Module } from '@nestjs/common';
import { ZepController } from './zep.controller';
import { ZepService } from './zep.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamQuestion } from 'src/mock-exams/entities/mock-exam-question.entity';
import { ZepUser } from './entities/zepUser.entity';
import { ZepStudyTime } from './entities/zepStudyTime.entity';
import { ZepUserController } from './zepUser.controller';
import { ZepUserService } from './zepUser.service';
import { ZepStudyTimeController } from './zepStudyTime.controller';
import { ZepStudyTimeService } from './zepStudyTime.service';
import { ZepMapUserCount } from './entities/zepMapUserCount.entity';
import { ZepMapController } from './zepMap.controller';
import { ZepMapService } from './zepMap.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MockExamQuestion,
      ZepUser,
      ZepStudyTime,
      ZepMapUserCount,
    ]),
  ],
  controllers: [
    ZepController,
    ZepUserController,
    ZepStudyTimeController,
    ZepMapController,
  ],
  providers: [
    ZepController,
    ZepService,
    ZepUserController,
    ZepUserService,
    ZepStudyTimeController,
    ZepStudyTimeService,
    ZepMapService,
    ZepMapController,
  ],
})
export class ZepModule {}
