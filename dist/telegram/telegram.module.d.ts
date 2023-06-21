import { DynamicModule } from '@nestjs/common';
import { TelegramModuleOptions } from './telegramBot.interface';
export declare class TelegramModule {
    static forRoot(options: TelegramModuleOptions): DynamicModule;
}
