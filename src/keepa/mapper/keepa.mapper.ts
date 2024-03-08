import {
  iPhoneNameRegex,
  productCarrierRegex,
  productGradeKeepaRegex,
} from '@/keepa/constant';
import {
  EzeProduct,
  IKeepaPrice,
  IKeepaProduct,
  IResource,
  KeepaProduct,
} from '@/keepa/interface/keepa.interface';
import { findLongestSubArrayIndex } from '@/utils/array';
import {
  formatDate,
  keepaTimeToDateString,
  keepaPriceToStdFormat,
  getLastPrice,
} from '@/keepa/keepa.utils';

export interface KeepaProductMap {
  product: IKeepaProduct;
  category: string;
  country: string;
  engine: string;
}

export function mapKeepaGradeToEzeGrade(grade: string): string {
  const gradeMap: Record<string, string> = {
    'Renewed Premium': 'A1',
    Renewed: 'A2',
  };

  return gradeMap[grade] || null;
}

export function mapKeepaProductsToEzeProduct(
  product: IKeepaProduct & {
    category: string;
    country: string;
    engine: string;
  },
): EzeProduct {
  const {
    asin,
    brand,
    color,
    amazonDate,
    amazonPrice,
    newMarketplaceDate,
    newMarketplacePrice,
    usedMarketplaceDate,
    usedMarketplacePrice,
    size,
    title,
    category,
    country,
    engine,
  } = product;
  const name = iPhoneNameRegex.test(title)
    ? iPhoneNameRegex.exec(title)![0]
    : title;

  const carrier = productCarrierRegex.test(title)
    ? productCarrierRegex.exec(title)![0]
    : null;

  const grade = productGradeKeepaRegex.test(title)
    ? productGradeKeepaRegex.exec(title)![0]
    : null;

  return {
    name,
    brand,
    category,
    properties: {
      color,
      grade: mapKeepaGradeToEzeGrade(grade),
      carrier,
      storage: size,
    },
    amazonPrice: +amazonPrice,
    amazonDate: formatDate(amazonDate),
    newMarketplacePrice: +newMarketplacePrice,
    newMarketplaceDate: formatDate(newMarketplaceDate),
    usedMarketplacePrice: +usedMarketplacePrice,
    usedMarketplaceDate: formatDate(usedMarketplaceDate),
    scrapedDate: new Date(),
    country,
    resource: 'Amazon',
    engine,
    asin,
  };
}

export function mapCurrentPriceAndDate(
  keepaProduct: KeepaProduct,
  resource: IResource,
): IKeepaPrice[] {
  const { asin, title, brand, color, size } = keepaProduct;
  const { index, title: resourceTitle } = resource;

  const results: IKeepaPrice[] = [];
  const dates: string[] = [];
  const prices: string[] = [];

  keepaProduct.csv[index].forEach((data: number, index: number) => {
    // Grab the latest date
    if (index % 2 === 0) {
      const date = keepaTimeToDateString(data);
      dates.push(date);
    } else {
      const price = keepaPriceToStdFormat(data);
      prices.push(price);
    }
  });

  const recentDate = dates[dates.length - 1];
  results.push({
    price: getLastPrice(prices),
    asin,
    brand,
    color,
    date: recentDate,
    size,
    title,
    resource: resourceTitle,
  });
  return results;
}

export function mapCurrentPriceToIKeepaProduct(
  priceAndDate: IKeepaPrice[][],
): IKeepaProduct[] {
  const [amazonData, newMarketplaceData, usedMarketplaceData] = priceAndDate;

  const [firstAmazonData]: any = amazonData ?? [{ date: null, price: null }];
  const [firstNewMarketplaceData]: any = newMarketplaceData ?? [
    { date: null, price: null },
  ];
  const [firstUsedMarketplaceData]: any = usedMarketplaceData ?? [
    { date: null, price: null },
  ];

  const { asin, brand, color, size, title } = firstAmazonData;

  return [
    {
      amazonDate: firstAmazonData.date,
      amazonPrice: firstAmazonData.price,
      newMarketplaceDate: firstNewMarketplaceData.date,
      newMarketplacePrice: firstNewMarketplaceData.price,
      usedMarketplaceDate: firstUsedMarketplaceData.date,
      usedMarketplacePrice: firstUsedMarketplaceData.price,
      asin,
      brand,
      color,
      size,
      title,
      resource: 'Amazon',
    },
  ];
}

export function mapKeepaProductToIKeepaPrice(
  keepaProduct: KeepaProduct,
  resource: IResource,
): IKeepaPrice[] {
  const { asin, title, brand, color, size } = keepaProduct;
  const { index, title: resourceTitle } = resource;

  const results: IKeepaPrice[] = [];
  const dates: string[] = [];
  const prices: string[] = [];

  keepaProduct.csv[index].forEach((data: number, index: number) => {
    if (index % 2 === 0) {
      // timestamp and data
      const date = keepaTimeToDateString(data);
      dates.push(date);
    } else {
      // Price
      const price = keepaPriceToStdFormat(data);
      prices.push(price);
    }
  });

  dates.forEach((date, index) => {
    results.push({
      price: prices[index],
      asin,
      brand,
      color,
      date: date,
      size,
      title,
      resource: resourceTitle,
    });
  });

  return results;
}

export function mapIKeepaPriceToIKeepaProduct(
  pricing: IKeepaPrice[][],
): IKeepaProduct[] {
  const longestPricingIndex = findLongestSubArrayIndex(pricing);

  const keepaProducts: IKeepaProduct[] = [];
  const amazonPrice = pricing[0].reverse(); //get latest output first
  const newPrice = pricing[1].reverse();
  const usedPrice = pricing[2].reverse();

  pricing[longestPricingIndex].forEach((price, index) => {
    keepaProducts.push({
      amazonDate: amazonPrice[index]?.date ?? null,
      amazonPrice: amazonPrice[index]?.price ?? null,
      newMarketplaceDate: newPrice[index]?.date ?? null,
      newMarketplacePrice: newPrice[index]?.price ?? null,
      usedMarketplaceDate: usedPrice[index]?.date ?? null,
      usedMarketplacePrice: usedPrice[index]?.price ?? null,
      asin: price.asin,
      brand: price.brand,
      color: price.color,
      size: price.size,
      title: price.title,
      resource: 'Amazon',
    });
  });

  return keepaProducts;
}
