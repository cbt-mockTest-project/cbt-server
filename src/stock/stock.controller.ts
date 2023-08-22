import { Stock } from './entities/stock.entity';
import { StockService } from './stock.service';
import { Controller, Get, Query } from '@nestjs/common';
import { SearchStockInput } from './dtos/searchStock.dto.';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('parsing')
  async parsingStockData() {
    return this.stockService.parsingStockData();
  }

  @Get('')
  async searchStock(@Query() searchStockInput: SearchStockInput) {
    return this.stockService.searchStock(searchStockInput);
  }
}
