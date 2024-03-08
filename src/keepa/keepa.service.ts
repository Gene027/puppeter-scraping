import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import axios, { AxiosInstance } from 'axios';
import {
  RESOURCE,
  iphoneProductQuery,
  samsungProductQuery,
} from '@/keepa/constant';
import { HistoricalPricingQueryDto } from '@/keepa/dto/keepa.dto';
import {
  ApiRequest,
  EzeProduct,
  IKeepaProduct,
  KeepaProduct,
} from '@/keepa/interface/keepa.interface';
import {
  mapCurrentPriceAndDate,
  mapCurrentPriceToIKeepaProduct,
  mapIKeepaPriceToIKeepaProduct,
  mapKeepaProductToIKeepaPrice,
  mapKeepaProductsToEzeProduct,
} from '@/keepa/mapper/keepa.mapper';
import { HistoryProductPrice } from './entity/historical-request-price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { chunkArray } from '@/utils/array';
import { appendToExcel } from '@/utils/append-to-excel';

@Injectable()
export class KeepaService {
  private apiKey;
  private baseUrl;
  private headers;
  private axiosInstance: AxiosInstance;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,

    @InjectRepository(HistoryProductPrice)
    private readonly historyProductPriceRepo: Repository<HistoryProductPrice>,
  ) {
    this.apiKey = process.env.KEEPA_API_KEY;
    this.baseUrl = 'https://api.keepa.com';
    this.headers = {
      'Content-Type': 'application/json',
    };

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
    });
  }

  async fetchProductData(
    productTracked: Record<string, any>,
  ): Promise<KeepaProduct[]> {
    try {
      const { data } = await axios.post(
        `${this.baseUrl}/query`,
        productTracked.query,
        {
          headers: this.headers,
          params: {
            key: this.apiKey,
            domain: '1',
          },
        },
      );

      console.log('Retrieved ASIN List...');
      console.log('Tokens left: ', data.tokensLeft);
      console.log('Refill in: ', data.refillIn);
      console.log('Refill Rate: ', data.refillRate);

      if (data.asinList.length == 0) {
        console.log(
          'No ASIN found for the given query: ',
          productTracked.query,
        );
        return null;
      }

      const result = await this.getProductData(data.asinList);

      console.log('Retrieved Product Data...');
      console.log('Tokens left: ', result.tokensLeft);
      console.log('Refill in: ', result.refillIn);
      console.log('Refill Rate: ', result.refillRate);

      const keepaProducts: KeepaProduct[] = result.products;

      if (keepaProducts.length == 0) {
        console.log(
          'No Keepa products found for the given query: ',
          productTracked.query,
        );
        return null;
      }
      return keepaProducts;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: 500,
          message: `Error fetching product data from Keepa: ${error?.message}`,
        },
        500,
      );
    }
  }

  async getHistoricalPricing(productType: string): Promise<any> {
    // TODO: Implement a loop to get all products from productQuery and track tokensLeft
    console.log(`Product type is: ${productType}`);
    const productIndex = 0; //specify index to match product query
    let productTracked;

    if (productType.toLowerCase() === 'iphone') {
      productTracked = iphoneProductQuery[productIndex];
    } else {
      productTracked = samsungProductQuery[productIndex];
    }

    const keepaProducts: KeepaProduct[] = await this.fetchProductData(
      productTracked,
    );
    if (keepaProducts.length == 0) {
      console.log(
        'No Keepa products found for the given query: ',
        productTracked.query,
      );
      return;
    }

    const rawProducts: IKeepaProduct[] = [];

    keepaProducts.forEach((product: KeepaProduct) => {
      const resources = [RESOURCE.amazon, RESOURCE.new, RESOURCE.used];

      const mappedPrices = resources.map((resource) =>
        mapKeepaProductToIKeepaPrice(product, resource),
      );
      const mappedProducts = mapIKeepaPriceToIKeepaProduct(mappedPrices);

      rawProducts.push(...mappedProducts);
    });
    console.log('...Raw Products...', rawProducts.length);
    console.log('...Mapped Keepa Price to IKeepaProduct...');
    const finalProducts: EzeProduct[] = rawProducts.map((product) =>
      mapKeepaProductsToEzeProduct({
        ...product,
        category: productTracked.category,
        country: 'US',
        engine: 'Keepa',
      }),
    );

    console.log('....Mapped IKeepaProduct to EzeProduct...');

    if (finalProducts.length == 0) return;

    const filteredProducts = finalProducts.filter(
      (raw) =>
        raw.properties.carrier != null &&
        !(
          raw.amazonPrice <= 0 &&
          raw.newMarketplacePrice <= 0 &&
          raw.usedMarketplacePrice <= 0
        ),
    );

    if (filteredProducts.length <= 0) {
      console.log('No result matched Eze requirements');
      return;
    }

    console.log('Filtered Products...', filteredProducts.length);

    console.log('Dumping to database, Please wait...');

    const productChunks = chunkArray(filteredProducts, 100);
    for (const productChunk of productChunks) {
      await this.historyProductPriceRepo.insert(productChunk);

      console.log('----- DUMPED -----', 100);
    }

    await appendToExcel(filteredProducts);
  }

  async getWeeklyPricing(productType: string): Promise<any> {
    // TODO: Implement a loop to get all products from productQuery and track tokensLeft
    console.log(`Product type is: ${productType}`);
    const productIndex = 0; //specify index to match product query
    let productTracked;

    if (productType.toLowerCase() === 'iphone') {
      productTracked = iphoneProductQuery[productIndex];
    } else {
      productTracked = samsungProductQuery[productIndex];
    }

    const keepaProducts: KeepaProduct[] = await this.fetchProductData(
      productTracked,
    );
    if (keepaProducts.length == 0) {
      console.log(
        'No Keepa products found for the given query: ',
        productTracked.query,
      );
      return;
    }

    const rawProducts: IKeepaProduct[] = [];

    keepaProducts.forEach((product: KeepaProduct) => {
      const resources = [RESOURCE.amazon, RESOURCE.new, RESOURCE.used];
      const mappedPriceAndDate = resources.map((resource) =>
        mapCurrentPriceAndDate(product, resource),
      );
      const mappedProducts = mapCurrentPriceToIKeepaProduct(mappedPriceAndDate);

      rawProducts.push(...mappedProducts);
    });

    console.log('...Raw Products...', rawProducts.length);
    console.log('...Mapped Keepa Price to IKeepaProduct...');
    const finalProducts: EzeProduct[] = rawProducts.map((product) =>
      mapKeepaProductsToEzeProduct({
        ...product,
        category: productTracked.category,
        country: 'US',
        engine: 'Keepa',
      }),
    );

    console.log('....Mapped IKeepaProduct to EzeProduct...');

    if (finalProducts.length == 0) return;

    const filteredProducts =
      productType.toLowerCase() === 'iphone'
        ? finalProducts.filter(
            (raw) =>
              raw.properties.carrier != null &&
              !(
                raw.amazonPrice <= 0 &&
                raw.newMarketplacePrice <= 0 &&
                raw.usedMarketplacePrice <= 0
              ),
          )
        : finalProducts.filter(
            (raw) =>
              !(
                raw.amazonPrice <= 0 &&
                raw.newMarketplacePrice <= 0 &&
                raw.usedMarketplacePrice <= 0
              ),
          );

    if (filteredProducts.length <= 0) {
      console.log('No result matched Eze requirements');
      return;
    }

    console.log('Filtered Products...', filteredProducts.length);

    console.log('Dumping to database, Please wait...');
    const productChunks = chunkArray(filteredProducts, 100);
    for (const productChunk of productChunks) {
      await this.historyProductPriceRepo.insert(productChunk);

      console.log('----- DUMPED -----', 100);
    }

    await appendToExcel(filteredProducts);
  }

  async getProductsStatByDate(
    queryOptions: HistoricalPricingQueryDto,
  ): Promise<any> {
    const { domain = '1', date, searchTerm: term, page = '0' } = queryOptions;

    try {
      const { data } = await axios.get(`${this.baseUrl}/search`, {
        headers: this.headers,
        params: {
          key: this.apiKey,
          domain,
          type: 'product',
          term,
          page,
          // https://keepa.com/#!discuss/t/product-searches/109
          stats: date ?? '2022-12-20,2022-12-21',
          history: '1',
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductHistoricalPrices(asin: string, date: string): Promise<any> {
    const request: ApiRequest = {
      method: 'GET',
      path: '/product',
      query: {
        key: this.apiKey,
        domain: '1',
        asin: asin,
        stats: date,
        history: '1',
      },
      body: {},
    };

    try {
      const data = await this.requestKeepaAPI<any>(request);
      const keepaProducts: KeepaProduct[] = data.products;

      return keepaProducts;
    } catch (error) {
      console.log(error);
      this.logger.error('Error fetching product data from Keepa', error);
    }
  }

  private async requestKeepaAPI<T>(request: ApiRequest): Promise<T> {
    const options = {
      method: request.method,
      url: request.path,
      params: request.query,
      data: request.body,
    };

    try {
      const res = await this.axiosInstance(options);
      return res.data;
    } catch (error: any) {
      console.log(error);

      throw new HttpException(
        {
          statusCode: 500,
          message: `Error fetching product data from Keepa: ${error?.message}`,
        },
        500,
      );
    }
  }

  private async getProductData(
    asins: string[],
  ): Promise<Record<string, any> & { products: KeepaProduct[] }> {
    const asin = asins.join(','); //max length 100

    try {
      const { data } = await axios.get(`${this.baseUrl}/product`, {
        headers: this.headers,
        params: {
          key: this.apiKey,
          domain: '1',
          asin,
          history: '1',
        },
      });

      return data;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        {
          statusCode: 500,
          message: `Error fetching product data from Keepa: ${error?.message}`,
        },
        500,
      );
    }
  }
}
