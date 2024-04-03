import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { concatUint8Arrays } from "./utils/streamToBuffer";
import { scrapeData } from "./utils/scrapeData";
import e from "express";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  async scrapeHtml(file: any): Promise<Buffer> {
    try {
      const reader = file.getReader();

      const chunks = [];
      let streamComplete = false;

      while (!streamComplete) {
        const { value, done } = await reader.read();
        if (done) {
          streamComplete = true;
        } else {
          chunks.push(value);
        }
      }

      const data = new TextDecoder().decode(concatUint8Arrays(chunks));

      const resultBuffer = await scrapeData(data);

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
      throw new InternalServerErrorException(error.message ?? "An error occurred")
    }
    return "Scraped test HTML";
  }
}
