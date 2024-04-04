import { appendToExcel } from "./excel";
import * as path from "path";
const puppeteer = require("puppeteer");

export async function scrapeData(html: string, download: boolean = true) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  console.log("Browser launched", `download: ${download}`);
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1024 });

    if (download) {
      await page.setContent(html, {
        waitUntil: ["load", "domcontentloaded", "networkidle0"],
      });
    } else {
      await page.goto(`file:${path.join(__dirname, "..", "..", html)}`, {
        waitUntil: ["load", "domcontentloaded", "networkidle0"],
      });
    }

    // await page.screenshot({
    //   type: "jpeg",
    //   path: "screenshot.jpeg",
    //   fullPage: true,
    // });

    const rawProducts = await page.evaluate(() => {
      const items: any[] = [];
      document
        .querySelectorAll('[data-testid="list-view"]')
        .forEach((element) => {
          const titleElement: any = element.querySelector(
            '[data-automation-id="product-title"]'
          );

          const priceElement: any = element.querySelector(
            '[data-automation-id="product-price"]'
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
            const title = titleElement.innerText;
            const price = priceElement.querySelector(
              "div.mr1.mr2-xl.b.black.lh-copy.f5.f4-l"
            ).innerText;
            const image = imageElement.getAttribute("src");
            const rating = ratingElement
              ? ratingElement.getAttribute("data-value")
              : "";
            const review = reviewElement ? reviewElement.innerText : "";

            if (title && price) {
              items.push({
                title,
                price,
                image,
                rating,
                review,
              });
            }
          } else {
            throw new Error(
              "Unable to scrape data from the page, no products or unmatched selectors found."
            );
          }
        });

      return items;
    });

    if (rawProducts.length === 0) {
      throw new Error("No products found");
    }

    const result = await appendToExcel(rawProducts, download);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await browser.close();
    console.log("Browser closed");
  }
}
