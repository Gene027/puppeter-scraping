import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as path from 'path';
import { appendToExcel } from '@/utils/append-to-excel';
import { convertAllImagesToBase64 } from './utils/url-to-data-uri';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

@Injectable()
export class ScrapingService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async scrapeBackMarket(): Promise<any> {
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 1024 });
      await page.goto(
        'https://www.backmarket.com/en-us/search?q=iPhone%2012%20-%20Unlocked',
      );

      await page.screenshot({
        type: 'jpeg',
        path: 'screenshot.jpeg',
        fullPage: true,
      });

      await browser.close();
    } catch (error) {
      console.log(error);
    }
    return {
      message: 'Okay',
    };
  }

  async scrapeWalmartHtml(): Promise<any> {
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 1024 });
      await page.goto(
        `file:${path.join(__dirname, '..', '..', '/public/test.html')}`,
        {
          waitUntil: ['load', 'domcontentloaded'],
        },
      );
      const imagesSelector = 'img.absolute.top-0.left-0';
      const pricesSelector = 'div.mr1.mr2-xl.b.black.lh-copy.f5.f4-l';
      const descriptionSelector =
        'span.normal.dark-gray.mb0.mt1.lh-title.f6.f5-l.lh-copy';
      const ratingCountsSelector = 'span.sans-serif.gray.f7';

      const productUrls: string[] = await page.$$eval(imagesSelector, (imgs) =>
        imgs.map((img) => img.src),
      );

      const productPrices: string[] = await page.$$eval(
        pricesSelector,
        (prices) => prices.map((p) => p.innerText),
      );

      const productDesc: string[] = await page.$$eval(
        descriptionSelector,
        (descs) => descs.map((d) => d.innerText),
      );

      const productRatingCounts: string[] = await page.$$eval(
        ratingCountsSelector,
        (counts) => counts.map((c) => c.innerText),
      );
      const base64Urls = await convertAllImagesToBase64(productUrls);
      const products: Record<string, string>[] = [];
      for (let i = 0; i < productUrls.length; i++) {
        products.push({
          description: productDesc[i],
          price: productPrices[i],
          imageUrl: base64Urls[i],
          ratingCount: productRatingCounts[i],
        });
      }

      await appendToExcel(products);

      // await page.screenshot({
      //   type: 'jpeg',
      //   path: 'screenshot.jpeg',
      //   fullPage: true,
      // });

      await browser.close();

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
