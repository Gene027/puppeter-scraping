import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Scrape HTML' })
  @Post('scrape')
  async scrapeHtml(@Body() file: any,  @Res() res: Response,): Promise<any>{
    const buffer = await this.appService.scrapeHtml(file);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=walmart-data.xlsx`);
    res.send(buffer);
  }

  @ApiOperation({ summary: 'Scrape test HTML' })
  @Get('scrape/test')
  async scrapeTestHtml(): Promise<any>{
    return await this.appService.scrapeTestHtml();
  }
}
