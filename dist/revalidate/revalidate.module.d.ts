import { DynamicModule } from '@nestjs/common';
import { RevalidateModuleOptions } from './revalidate.interface';
export declare class RevalidateModule {
    static forRoot(options: RevalidateModuleOptions): DynamicModule;
}
