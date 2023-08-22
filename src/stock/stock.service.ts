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
    const workbook = xlsx.readFile(
      '/Users/sim-eungwang/Documents/cbt/cbt-server/src/stock/data_0344_20230822.xlsx',
    ); // 읽을 파일의 경로를 지정합니다.
    const sheetName = workbook.SheetNames[0]; // 첫 번째 시트의 이름을 가져옵니다.
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    const stockCodeList = jsonData.map((data) => ({
      code: data['종목코드'],
      name: data['종목명'].trim().replace(/(\s*)/g, ''),
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
        name: keyword.trim().replace(/(\s*)/g, ''),
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
    const stockInfo = {
      종목명: stock.name,
      시가총액: String(stockData.data.marketSum).substring(0, 3) + '억',
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
