import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScrapingService } from './scraping.service';

@ApiTags('War Engine Scraping')
@Controller('scrape')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Get('/back-market')
  @ApiOperation({ summary: 'Scrape Backmarket prices' })
  async scrapeBackMarketPrices(): Promise<{ message: string }> {
    return await this.scrapingService.scrapeBackMarket();
  }

  @Get('/walmart/live')
  @ApiOperation({ summary: 'Scrape Walmart Live prices' })
  async scrapeLiveWalmartPrices(): Promise<{ message: string }> {
    return await this.scrapingService.scrapeWalmartLiveData();
  }
}
