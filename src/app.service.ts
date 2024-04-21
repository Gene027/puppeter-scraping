import { scrapeData } from "./utils/scrapeData";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductPrice } from "@/dal/product-price.entity";
const puppeteer = require("puppeteer");
import {
  WalmartProduct,
  RawWalmartData,
} from "@/interfaces/scraping.interface";
import { appendToExcel } from "./utils/excel";
import { frozenFoodsQuery, fruitsAndVegetablesQuery } from "./constants";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductPrice)
    private readonly productPriceRepo: Repository<ProductPrice>
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  async scrapeWalmart(): Promise<any> {
    const AUTH = `${process.env.BRIGHTDATA_USERNAME}:${process.env.BRIGHTDATA_PASSWORD}`;
    const SBR_WS_ENDPOINT = `wss://${AUTH}@${process.env.BRIGHTDATA_HOST}`;

    for (const walmartLiveProduct of fruitsAndVegetablesQuery) {
      const pages = walmartLiveProduct.pages || 1;

      for (let i = 1; i <= pages; i++) {
        try {
          const browser = await puppeteer.connect({
            browserWSEndpoint: SBR_WS_ENDPOINT,
          });

          console.log("Connected to browser");

          const page = await browser.newPage();
          await page.setViewport({ width: 1280, height: 1024 });

          const url = `${walmartLiveProduct.url}&page=${i}`;
          await page.goto(url, {
            waitUntil: ["domcontentloaded", "load", "networkidle0"],
            timeout: 2 * 60 * 1000,
          });

          console.log(`Navigated to page ${i} of ${url}`);

          const rawProducts: RawWalmartData[] = await page.evaluate(() => {
            const items: RawWalmartData[] = [];
            document
              .querySelectorAll('[data-testid="list-view"]')
              .forEach((element) => {
                const titleElement: any = element.querySelector(
                  '[data-automation-id="product-title"]'
                );
                const priceElement: any = element.querySelector(
                  '[data-automation-id="product-price"] div.f5.f4-l'
                );

                const imageElement: any = element.querySelector(
                  '[data-testid="productTileImage"]'
                );

                const ratingElement: any = element.querySelector(
                  '[data-testid="product-ratings"]'
                );

                const reviewElement: any = element.querySelector(
                  '[data-testid="product-reviews"]'
                );

                if (titleElement && priceElement && imageElement) {
                  const title: string = titleElement.innerText;
                  const image = imageElement.getAttribute("src");
                  const rating = ratingElement
                    ? ratingElement.getAttribute("data-value")
                    : "";
                  const review = reviewElement ? reviewElement.innerText : "";

                  const price: string = priceElement.innerText;

                  if (title && price) {
                    items.push({ title, price, image, rating, review });
                  }
                }
              });

            return items;
          });

          await browser.close();
          console.log(`Found ${rawProducts.length} products`);
          if (rawProducts.length == 0) {
            continue;
          }

          const products: WalmartProduct[] = rawProducts.map((p) => {
            return {
              title: p.title,
              price: p.price,
              image: p.image,
              rating: p.rating,
              review: p.review,
              category: walmartLiveProduct.category,
              subCategory: walmartLiveProduct.subCategory,
            };
          });

          appendToExcel(products);

          try {
            await this.productPriceRepo.insert(products);
            console.log("Inserted products to db");
          } catch (error) {
            console.log(error);
          }

        } catch (error) {
          console.log(error);
          continue;
        }
      }
    }
    
    console.log("Done scraping walmart");
  }

  async scrapeHtml(file: any): Promise<Buffer> {
    try {
      const data: string = file.buffer.toString("utf-8");

      const resultBuffer = await scrapeData(data, true);

      return resultBuffer as Buffer;
    } catch (error: any) {
      console.error(error);
      throw new InternalServerErrorException(
        error.message ?? "An error occurred"
      );
    }
  }

  async scrapeTestHtml(): Promise<any> {
    try {
      await scrapeData("public/test.html", false);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message ?? "An error occurred"
      );
    }
    return "Scraped test HTML";
  }
}
