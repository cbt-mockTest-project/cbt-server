import { Controller, Get, Query } from '@nestjs/common';
import { GetWeatherInput } from './dtos/getWeather.dto';
import axios from 'axios';
import { LOCATION_DETAIL_MAP, LOCATION_MAP } from './weather.constants';

@Controller('weather')
export class WeatherController {
  @Get('')
  async getWeather(@Query() getWeatherInput: GetWeatherInput) {
    try {
      const { keyword } = getWeatherInput;
      let locationName = keyword;
      const locations = Object.keys(LOCATION_MAP);
      locationName = locations.find((location) => keyword.includes(location));
      const locationDetailName = LOCATION_MAP[locationName]?.find(
        (detail) =>
          keyword.includes(detail) ||
          keyword.includes(LOCATION_DETAIL_MAP[detail]),
      );
      if (locationDetailName) {
        locationName =
          locationName + ' ' + LOCATION_DETAIL_MAP[locationDetailName] ||
          locationDetailName;
      }
      const res = await axios.get(
        `https://ac.search.naver.com/nx/ac?q=${
          locationName || keyword
        }&con=0&frm=nv&ans=2&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&run=2&rev=4&q_enc=UTF-8&st=100`,
      );
      const { answer } = res.data;
      if (answer.length === 0) {
        return {
          ok: false,
          error: '등록되지 않은 지역입니다.\n개발자한테 알려주세요.',
        };
      }
      let result = '';
      if (answer[0][2] === 'asiw') {
        const location = answer[0][1];
        const time = answer[0][5];
        const condition = answer[0][7];
        const temperature = answer[0][8];
        const dust = `${answer[0][9]}: ${answer[0][10]}${answer[0][11]}`;
        result = `${location}\n${time} 기준\n날씨: ${condition}\n기온: ${temperature}도\n강수량: ${dust}`;
      } else {
        const location = answer[0][1];
        const linkName = answer[0][7];
        const link = answer[0][5];
        result = `${location}\n${linkName} 홈페이지에서 확인하기\n${link}`;
      }

      return {
        ok: true,
        data: result,
      };
    } catch (e) {
      e;
      return {
        ok: false,
        error: '날씨를 가져올 수 없습니다.',
      };
    }
  }
}
