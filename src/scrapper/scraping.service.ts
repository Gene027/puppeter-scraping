import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { appendToExcel } from "@/utils/append-to-excel";
import { frozenFoodsQuery, walmartProductSelectors } from "./constant";
import { convertImageUrlToBase64 } from "./utils/url-to-data-uri";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require("puppeteer");

@Injectable()
export class ScrapingService {
  private readonly logger = new Logger(ScrapingService.name);
  constructor() {}

  async scrapeBackMarket(): Promise<any> {
    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 1024 });
      await page.goto(
        "https://www.backmarket.com/en-us/search?q=iPhone%2012%20-%20Unlocked"
      );

      await page.screenshot({
        type: "jpeg",
        path: "screenshot.jpeg",
        fullPage: true,
      });

      await browser.close();
    } catch (error) {
      console.log(error);
    }
    return {
      message: "Okay",
    };
  }

  async scrapeWalmartLiveData(): Promise<any> {
    const AUTH = `${process.env.BRIGHTDATA_USERNAME}:${process.env.BRIGHTDATA_PASSWORD}`;
    const SBR_WS_ENDPOINT = `wss://${AUTH}@${process.env.BRIGHTDATA_HOST}`;

    try {
      const browser = await puppeteer.connect({
        browserWSEndpoint: SBR_WS_ENDPOINT,
      });
      this.logger.log("Connected to browser");

      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 1024 });

      for(const product of frozenFoodsQuery) {
        const { url, category, subCategory, pages } = product;
        for (let i = 1; i <= pages; i++) {
          await page.goto(`${url}&page=${i}`, {
            waitUntil: 'networkidle0',
            timeout: 2 * 60 * 1000,
          });
          this.logger.log(`Navigated to ${url}&page=${i}`);

          // await page.screenshot({
          //   type: "jpeg",
          //   path: "screenshot.jpeg",
          //   fullPage: true,
          // });
          // return;

          const {
            descriptionSelector,
            imagesSelector,
            pricesSelector,
            ratingSelector,
            reviewSelector
          } = walmartProductSelectors;

          const productImgUrls: string[] = await page.$$eval(imagesSelector, (imgs) =>
            imgs.map((img) => img.src)
          );

          const productRatings: string[] = await page.$$eval(
            ratingSelector,
            (ratings) => ratings.map((r) => r.getAttribute('data-value'))
          );
      
          const productPrices: string[] = await page.$$eval(
            pricesSelector,
            (prices) => prices.map((p) => p.innerText)
          );

          const productDesc: string[] = await page.$$eval(
            descriptionSelector,
            (descs) => descs.map((d) => d.innerText)
          );

          const productReviewCounts: string[] = await page.$$eval(
            reviewSelector,
            (reviews) => reviews.map((r) => r.innerText)
          );

          const data = [productPrices, productDesc, productImgUrls,];

          const arrayLengths = data.map((array) => array.length);
          const allArraysHaveSameLength = arrayLengths.every(
            (length) => length === arrayLengths[0],
          );

          if (allArraysHaveSameLength) {
            this.logger.log('Data is consistent and can map correctly');
          } else {
            this.logger.log('Data is inconsistent and cannot map correctly');
            console.log(
              `productPrices: ${productPrices.length} productTitles: ${productDesc.length} productImgUrls: ${productImgUrls.length} productReviewCounts: ${productReviewCounts.length} productRatings: ${productRatings.length}`,
            );
            console.log(data);
            continue;
          }

          this.logger.log('converting images to base64')
          const imgDataUri = await Promise.all(productImgUrls.map( async (url) => await convertImageUrlToBase64(url)))

          this.logger.log('Images converted to base64')

          const products: Record<string, string>[] = [];
          for (let i = 0; i < productDesc.length; i++) {
            products.push({
              description: productDesc[i],
              price: productPrices[i],
              imageUrl: imgDataUri[i],
              // imageUrl: productImgUrls[i],
              reviews: productReviewCounts[i] || 'N/A',
              rating: productRatings[i] || 'N/A',
              category,
              subCategory,
            });
          }

          await appendToExcel(products);
        }
      }

      await browser.close();

      this.logger.log("Browser closed");
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Error scraping walmart: ${error.message}`
      );
    }
    return {
      message: "Okay",
    };
  }
}
