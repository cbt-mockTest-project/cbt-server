import { TelegramModuleOptions } from './telegramBot.interface';
import { SendMessageToAlramChannelOfTelegramInput, SendMessageToAlramChannelOfTelegramOutput } from './telegram.dto';
export declare class TelegramService {
    private readonly options;
    constructor(options: TelegramModuleOptions);
    sendMessageToAlramChannelOfTelegram(sendMessageToAlramChannelOfTelegramInput: SendMessageToAlramChannelOfTelegramInput): Promise<SendMessageToAlramChannelOfTelegramOutput>;
}
