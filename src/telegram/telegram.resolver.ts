import { TelegramService } from './telegram.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  SendMessageToAlramChannelOfTelegramInput,
  SendMessageToAlramChannelOfTelegramOutput,
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
}
