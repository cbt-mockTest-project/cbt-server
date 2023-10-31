import { TelegramService } from './telegram.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  SendMessageToAlramChannelOfTelegramInput,
  SendMessageToAlramChannelOfTelegramOutput,
  sendMessageToTelegramInput,
  sendMessageToTelegramOutput,
} from './telegram.dto';

@Resolver()
export class TelegramResolver {
  constructor(private readonly telegramService: TelegramService) {}

  @Mutation(() => SendMessageToAlramChannelOfTelegramOutput)
  async sendMessageToAlramChannelOfTelegram(
    @Args('input')
    sendMessageToAlramChannelOfTelegramInput: SendMessageToAlramChannelOfTelegramInput,
  ): Promise<SendMessageToAlramChannelOfTelegramOutput> {
    return this.telegramService.sendMessageToAlramChannelOfTelegram(
      sendMessageToAlramChannelOfTelegramInput,
    );
  }

  @Mutation(() => sendMessageToTelegramOutput)
  async sendMessageToTelegram(
    @Args('input')
    sendMessageToTelegramInput: sendMessageToTelegramInput,
  ): Promise<sendMessageToTelegramOutput> {
    return this.telegramService.sendMessageToTelegram(
      sendMessageToTelegramInput,
    );
  }
}
