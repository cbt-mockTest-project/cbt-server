import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ValidateChatbotKeyInput } from './dtos/validateChatbotKey.dto';
import { RegisterChatbotInput } from './dtos/registerChatbot.dto';
import { Role } from 'src/auth/role.decorators';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get('news')
  async getNews() {
    return this.chatbotService.getNews();
  }

  @Post('key')
  async createChatbotKeys() {
    return this.chatbotService.createChatbotKeys();
  }

  @Post('validate')
  async validateChatbotKey(
    @Body() validateChatbotKeyInput: ValidateChatbotKeyInput,
  ) {
    return this.chatbotService.validateChatbotKey(validateChatbotKeyInput);
  }

  // @Role(['ADMIN'])
  @Post('register')
  async registerChatbot(@Body() registerChatbotInput: RegisterChatbotInput) {
    return this.chatbotService.registerChatbot(registerChatbotInput);
  }
}
