import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { Inject, Injectable } from '@nestjs/common';
import { RevalidateModuleOptions } from './revalidate.interface';
import { RevalidateInput, RevalidateOutput } from './dto/revalidate.dto';
import axios from 'axios';

@Injectable()
export class RevalidateService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: RevalidateModuleOptions,
  ) {}

  async revalidate(
    revalidateInput: RevalidateInput,
  ): Promise<RevalidateOutput> {
    try {
      const { path } = revalidateInput;
      await axios.post(
        `${this.options.clientUrl}/api/revalidate?secret=${this.options.revalidateKey}`,
        { path },
      );
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'revalidate failed',
      };
    }
  }
}
