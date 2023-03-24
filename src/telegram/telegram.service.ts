import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { Inject, Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { TelegramModuleOptions } from './telegramBot.interface';
import {
  SendMessageToAlramChannelOfTelegramInput,
  SendMessageToAlramChannelOfTelegramOutput,
} from './telegram.dto';

@Injectable()
export class TelegramService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: TelegramModuleOptions,
  ) {}

  async sendMessageToAlramChannelOfTelegram(
    sendMessageToAlramChannelOfTelegramInput: SendMessageToAlramChannelOfTelegramInput,
  ): Promise<SendMessageToAlramChannelOfTelegramOutput> {
    try {
      const { message } = sendMessageToAlramChannelOfTelegramInput;
      const bot = new TelegramBot(this.options.token);

      bot.sendMessage(this.options.alramChannelId, message);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '메시지 전송에 실패했습니다.',
      };
    }
  }
}
