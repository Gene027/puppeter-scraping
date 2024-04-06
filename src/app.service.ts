import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { concatUint8Arrays } from "./utils/streamToBuffer";
import { scrapeData } from "./utils/scrapeData";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  async scrapeHtml(file: any): Promise<Buffer> {
    try {
      const data: string = file.buffer.toString('utf-8');
      
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
      throw new InternalServerErrorException(error.message ?? "An error occurred")
    }
    return "Scraped test HTML";
  }
}
