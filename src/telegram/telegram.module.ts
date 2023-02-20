import { TelegramResolver } from './telegram.resolver';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { Module, Global, DynamicModule } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramModuleOptions } from './telegramBot.interface';

@Module({})
@Global()
export class TelegramModule {
  static forRoot(options: TelegramModuleOptions): DynamicModule {
    return {
      module: TelegramModule,
      exports: [TelegramService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        TelegramService,
        TelegramResolver,
      ],
    };
  }
}
