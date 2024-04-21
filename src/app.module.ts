import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPrice } from './dal/product-price.entity';
import { dataSourceOptions } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([ProductPrice]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
