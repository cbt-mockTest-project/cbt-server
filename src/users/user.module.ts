import { NoticeResolver } from './notice.resolver';
import { Feedback } from './entities/feedback.entity';
import { Verification } from './entities/verification.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Notice } from './entities/notice.entity';
import { NoticeService } from './notice.service';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification, Feedback, Notice])],
  providers: [UserResolver, UserService, NoticeResolver, NoticeService],
  exports: [UserService, NoticeService],
  controllers: [UserController],
})
export class UserModule {}
