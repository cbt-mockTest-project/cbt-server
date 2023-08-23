import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import * as xlsx from 'xlsx';
import { SearchStockInput, SearchStockOutput } from './dtos/searchStock.dto.';
import axios from 'axios';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stock: Repository<Stock>,
  ) {}

  async parsingStockData() {
    const workbook = xlsx.readFile(process.env.STOCK_LIST_PATH as string);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    await this.stock.delete({});
    const stockCodeList = jsonData.map((data) => ({
      code: data['종목코드'],
      name: data['종목명'].trim().replace(/(\s*)/g, '').toLowerCase(),
    }));
    await this.stock.save(stockCodeList);
    return {
      ok: true,
    };
  }

  async searchStock(
    searchStockInput: SearchStockInput,
  ): Promise<SearchStockOutput> {
    const { keyword } = searchStockInput;
    const stock = await this.stock.findOne({
      where: {
        name: keyword.trim().replace(/(\s*)/g, '').toLowerCase(),
      },
    });
    if (!stock) {
      return {
        ok: false,
        error: '종목을 찾을 수 없습니다.',
      };
    }
    const stockData = await axios.get(
      `https://api.finance.naver.com/service/itemSummary.nhn?itemcode=${stock.code}`,
    );
    function convertToKoreanNumberFormat(num: number) {
      const 억 = Math.floor((num % 1000000) / 100);
      const 조 = Math.floor(num / 1000000);
      if (조) {
        return 조 + '조 ' + 억 + '억 ';
      }
      return 억 + '억';
    }
    const stockInfo = {
      종목명: stock.name.toUpperCase(),
      시가총액: convertToKoreanNumberFormat(stockData.data.marketSum),
      현재가: stockData.data.now.toLocaleString('ko-KR'),
      상승률: stockData.data.rate + '%',
      고가: stockData.data.high.toLocaleString('ko-KR'),
      저가: stockData.data.low.toLocaleString('ko-KR'),
      거래량: stockData.data.quant,
    };
    return {
      ok: true,
      ...stockInfo,
    };
  }
}
