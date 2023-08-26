import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotKey } from './entities/chatbot-key.entity';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotController, ChatbotService],
  imports: [TypeOrmModule.forFeature([ChatbotKey])],
})
export class ChatbotModule {}
