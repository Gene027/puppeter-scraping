import { KeepaController } from './keepa.controller';
import { Module } from '@nestjs/common';
import { KeepaService } from './keepa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryProductPrice } from './entity/historical-request-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryProductPrice])],
  controllers: [KeepaController],
  providers: [KeepaService],
})
export class KeepaModule {}
