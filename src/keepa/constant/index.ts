import { Resource } from '@/keepa/interface/keepa.interface';

export const iPhoneNameRegex: RegExp =
  /iPhone\s+\d+(\s+Mini)?(\s+Pro(\s+Max)?)?/;
export const productGradeKeepaRegex: RegExp = /Renewed(?:\s+Premium)?/;
export const productCarrierRegex: RegExp =
  /(?:\b\w+\s+)?(Unlocked|Locked)(?:\s+\w+\b)?/;

export const RESOURCE: Resource = {
  amazon: {
    title: 'Amazon',
    index: 0,
  },
  new: {
    title: 'Market Place',
    index: 1,
  },
  used: {
    title: 'Market Place',
    index: 2,
  },
};

export const iphoneProductQuery: Record<string, any>[] = [
  {
    category: 'Cell Phones',
    query: {
      title: 'Apple Iphone 11 -Locked -Carrier',
      rootCategory: 2335752011,
      categories_include: ['7072561011'],
      brand: ['apple'],
      sort: [['current_AMAZON', 'asc']],
      productType: [0, 1, 2],
      page: 0,
      perPage: 50,
    },
  },
  {
    category: 'Cell Phones',
    query: {
      title: 'Apple Iphone 12 -Locked -Carrier',
      rootCategory: 2335752011,
      categories_include: ['7072561011'],
      brand: ['apple'],
      sort: [['current_AMAZON', 'asc']],
      productType: [0, 1, 2],
      page: 0,
      perPage: 50,
    },
  },
  {
    category: 'Cell Phones',
    query: {
      title: 'Apple Iphone 13 -Locked -Carrier',
      rootCategory: 2335752011,
      categories_include: ['7072561011'],
      brand: ['apple'],
      sort: [['current_AMAZON', 'asc']],
      productType: [0, 1, 2],
      page: 0,
      perPage: 50,
    },
  },
  {
    category: 'Cell Phones',
    query: {
      title: 'Apple Iphone 14 -Locked -Carrier',
      rootCategory: 2335752011,
      categories_include: ['7072561011'],
      brand: ['apple'],
      sort: [['current_AMAZON', 'asc']],
      productType: [0, 1, 2],
      page: 0,
      perPage: 50,
    },
  },
  {
    category: 'Cell Phones',
    query: {
      title: 'Apple Iphone 15 -Locked -Carrier',
      rootCategory: 2335752011,
      categories_include: ['7072561011'],
      brand: ['apple'],
      sort: [['current_AMAZON', 'asc']],
      productType: [0, 1, 2],
      page: 0,
      perPage: 50,
    },
  },
];

export const samsungProductQuery: Record<string, any>[] = [
  {
    category: 'Cell Phones',
    query: {
      title: 'Samsung Galaxy S20 -Locked -Carrier',
      rootCategory: 2335752011,
      categories_include: ['7072561011'],
      manufacturer: ['samsung'],
      brand: ['samsung electronics'],
      categories_exclude: ['2407760011'],
      sort: [['current_SALES', 'asc']],
      productType: [0, 1, 2],
      perPage: 50,
      page: 0,
    },
  },
  {
    category: 'Cell Phones',
    query: {
      title: 'Samsung Galaxy S21 -Locked -Carrier',
      rootCategory: 2335752011,
      categories_include: ['7072561011'],
      manufacturer: ['samsung'],
      brand: ['samsung electronics'],
      categories_exclude: ['2407760011'],
      sort: [['current_SALES', 'asc']],
      productType: [0, 1, 2],
      perPage: 50,
      page: 0,
    },
  },
  {
    category: 'Cell Phones',
    query: {
      title: 'Samsung Galaxy S22 -Locked -Carrier',
      rootCategory: 2335752011,
      categories_include: ['7072561011'],
      manufacturer: ['samsung'],
      brand: ['samsung electronics'],
      categories_exclude: ['2407760011'],
      sort: [['current_SALES', 'asc']],
      productType: [0, 1, 2],
      perPage: 50,
      page: 0,
    },
  },
];
