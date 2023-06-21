import { TelegramService } from './telegram.service';
import { SendMessageToAlramChannelOfTelegramInput, SendMessageToAlramChannelOfTelegramOutput } from './telegram.dto';
export declare class TelegramResolver {
    private readonly telegramService;
    constructor(telegramService: TelegramService);
    sendMessageToAlramChannelOfTelegram(sendMessageToAlramChannelOfTelegramInput: SendMessageToAlramChannelOfTelegramInput): Promise<SendMessageToAlramChannelOfTelegramOutput>;
}
