import { Module } from '@nestjs/common';
import { DashBoardService } from './dash-board.service';
import { DashBoardController } from './dash-board.controller';

@Module({
  providers: [DashBoardService],
  controllers: [DashBoardController],
})
export class DashBoardModule {}
