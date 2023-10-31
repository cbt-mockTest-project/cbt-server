import { TelegramService } from './telegram.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  sendMessageToTelegramInput,
  sendMessageToTelegramOutput,
} from './telegram.dto';

@Resolver()
export class TelegramResolver {
  constructor(private readonly telegramService: TelegramService) {}

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
