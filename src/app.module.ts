import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration, dataSourceOptions } from './config';
import { KeepaModule } from './keepa/keepa.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapingModule } from './scrapper/scraping.module';

@Module({
  imports: [
    WinstonModule.forRoot(configuration().logging),
    TypeOrmModule.forRoot(dataSourceOptions),
    ScheduleModule.forRoot(),
    KeepaModule,
    ScrapingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
