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
    const { path } = revalidateInput;
    try {
      console.log(`${path} revalidate start`);
      await axios.post(
        `${this.options.clientUrl}/api/revalidate?secret=${this.options.revalidateKey}`,
        { path },
      );
      console.log(`${path} revalidate success`);
      return {
        ok: true,
      };
    } catch (e) {
      console.log(`${path} revalidate failure`);
      return {
        ok: false,
        error: 'revalidate failed',
      };
    }
  }
}
