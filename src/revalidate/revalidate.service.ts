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
      await axios.post(
        `http://localhost:3000/api/revalidate?secret=${this.options.revalidateKey}`,
        { path },
      );
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'revalidate failed',
      };
    }
  }
}
