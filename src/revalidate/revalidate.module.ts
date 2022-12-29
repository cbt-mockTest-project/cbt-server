import { RevalidateResolver } from './revalidate.resolver';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { Module, DynamicModule } from '@nestjs/common';
import { RevalidateModuleOptions } from './revalidate.interface';
import { RevalidateService } from './revalidate.service';

@Module({})
export class RevalidateModule {
  static forRoot(options: RevalidateModuleOptions): DynamicModule {
    return {
      module: RevalidateModule,
      exports: [RevalidateService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        RevalidateService,
        RevalidateResolver,
      ],
    };
  }
}
