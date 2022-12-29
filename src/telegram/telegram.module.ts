import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { TelegramModuleOptions } from './../../dist/telegram/telegram.interface.d';
import { Module, Global, DynamicModule } from '@nestjs/common';
import { TelegramService } from './telegram.service';

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
      ],
    };
  }
}
