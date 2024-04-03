import { Injectable } from '@nestjs/common';
import { generateHmac } from './coupang.util';
import axios from 'axios';

@Injectable()
export class CoupangService {
  DOMAIN = 'https://api-gateway.coupang.com';
  ACCESS_KEY = '';
  SECRET_KEY = '';

  async converLinkToPartnerLink(url: string): Promise<string> {
    const REQUEST_METHOD = 'POST';
    const END_POINT =
      '/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink';
    const REQUEST = {
      coupangUrls: [
        'https://www.coupang.com/vp/products/7719179313?itemId=20711637445&vendorItemId=88395480900&landingType=USED_DETAIL',
      ],
    };
    console.log('1');
    const authorization = generateHmac(
      REQUEST_METHOD,
      END_POINT,
      this.SECRET_KEY,
      this.ACCESS_KEY,
    );
    console.log('2');
    axios.defaults.baseURL = this.DOMAIN;

    try {
      const response = await axios.request({
        method: REQUEST_METHOD,
        url: END_POINT,
        headers: { Authorization: authorization },
        data: REQUEST,
      });
      console.log(response.data);
      return 'ok';
    } catch (err) {
      console.error(err.response.data);
    }
  }
}
