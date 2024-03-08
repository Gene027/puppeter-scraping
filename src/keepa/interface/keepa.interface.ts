export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD';

export interface ApiRequest {
  path: string;
  method: HTTPMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  query?: Record<string, any>;
}

export interface IResource {
  title: string;
  index: number;
}

export interface Resource {
  amazon: IResource;
  new: IResource;
  used: IResource;
}

export class EzeProduct {
  name: string; // iPhone 11
  brand: string; // Apple
  category: string; // Cell Phones
  properties: Record<string, string>;
  amazonPrice?: number;
  amazonDate?: string;
  newMarketplacePrice?: number;
  newMarketplaceDate?: string;
  usedMarketplacePrice?: number;
  usedMarketplaceDate?: string;
  scrapedDate: Date | string; // current date
  country: string; // Region
  resource: string;
  asin: string; // Amazon Standard Identification Number
  engine: string; // Keepa
}

export interface IKeepaPrice {
  title: string;
  asin: string;
  brand: string;
  color: string;
  size: string;
  date: string;
  price: string;
  resource: string; // Amazon | Amazon New
}

export interface IKeepaProduct {
  title: string;
  asin: string;
  brand: string;
  color: string;
  size: string;
  amazonPrice: number | string;
  amazonDate: string;
  newMarketplacePrice: number | string;
  newMarketplaceDate: string;
  usedMarketplacePrice: number | string;
  usedMarketplaceDate: string;
  resource: string; // Amazon
}

export interface KeepaProduct {
  productType: number;
  asin: string;
  domainId: number;
  title: string;
  trackingSince: number;
  listedSince: number;
  lastUpdate: number;
  lastRatingUpdate: number;
  lastPriceChange: number;
  lastEbayUpdate: number;
  lastStockUpdate: number;
  imagesCSV: string;
  rootCategory: string;
  categories: any[];
  categoryTree: object[];
  parentAsin: string;
  variationCSV: string;
  frequentlyBoughtTogether: string[];
  eanList: string[];
  upcList: string[];
  manufacturer: string;
  brand: string;
  productGroup: string;
  type: string;
  partNumber: string;
  binding: string;
  numberOfItems: number;
  numberOfPages: number;
  publicationDate: number;
  releaseDate: number;
  contributors: string[][];
  languages: string[][];
  model: string;
  color: string;
  size: string;
  edition: string;
  format: string;
  features: string[];
  description: string;
  hazardousMaterials: object[];
  packageHeight: number;
  packageLength: number;
  packageWidth: number;
  packageWeight: number;
  packageQuantity: number;
  itemHeight: number;
  itemLength: number;
  itemWidth: number;
  itemWeight: number;
  availabilityAmazon: number;
  availabilityAmazonDelay: number[];
  buyBoxEligibleOfferCounts: number[];
  ebayListingIds: any[];
  isAdultProduct: boolean;
  launchpad: boolean;
  audienceRating: string;
  newPriceIsMAP: boolean;
  isEligibleForTradeIn: boolean;
  isEligibleForSuperSaverShipping: boolean;
  fbaFees: object;
  referralFeePercentage: any;
  variations: object[];
  coupon: number;
  promotions: object[];
  stats: object;
  salesRankReference: any;
  salesRankReferenceHistory: any[];
  salesRanks: object;
  lastSoldUpdate: number;
  monthlySold: number;
  monthlySoldHistory: number[];
  rentalDetails: string;
  rentalSellerId: string;
  rentalPrices: object;
  offers: object[];
  liveOffersOrder: number[];
  buyBoxSellerIdHistory: string[];
  buyBoxUsedHistory: string[];
  isRedirectASIN: boolean;
  isSNS: boolean;
  offersSuccessful: boolean;
  csv: number[][]; // [timestamp, price]
}
