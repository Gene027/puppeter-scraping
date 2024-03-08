import { Controller, Get, Query } from '@nestjs/common';
import { KeepaService } from '@/keepa/keepa.service';
import { HistoricalPricingQueryDto } from '@/keepa/dto/keepa.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('War Engine Keepa')
@Controller('keepa')
export class KeepaController {
  constructor(private readonly keepaService: KeepaService) {}

  @Get('/find')
  @ApiOperation({ summary: 'Get historical prices for products' })
  async getHistoricalPrices(
    @Query() query: { product_type: string },
  ): Promise<any> {
    this.keepaService.getHistoricalPricing(query.product_type);
    return { message: 'Retrieval Ongoing...' };
  }

  @Get('/find-weekly')
  @ApiOperation({ summary: 'Get weekly prices for products' })
  async getWeeklyPrices(
    @Query() query: { product_type: string },
  ): Promise<any> {
    return this.keepaService.getWeeklyPricing(query.product_type);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search for products using product search params' })
  async searchProducts(
    @Query() query: HistoricalPricingQueryDto,
  ): Promise<any> {
    return this.keepaService.getProductsStatByDate(query);
  }

  @Get('/product')
  @ApiOperation({ summary: 'Find a product within a time period' })
  async findProduct(
    @Query() query: { date: string; asin: string },
  ): Promise<any> {
    return this.keepaService.getProductHistoricalPrices(query.asin, query.date);
  }
}
