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

@Module({
  imports: [
    TypeOrmModule.forFeature([MockExamQuestion, ZepUser, ZepStudyTime]),
  ],
  controllers: [ZepController, ZepUserController, ZepStudyTimeController],
  providers: [
    ZepController,
    ZepService,
    ZepUserController,
    ZepUserService,
    ZepStudyTimeController,
    ZepStudyTimeService,
  ],
})
export class ZepModule {}
