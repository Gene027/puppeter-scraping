import { Base } from '@/utils/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'historical_product_prices' })
export class HistoryProductPrice extends Base {
  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column({ nullable: true, type: 'jsonb' })
  properties: Record<string, string>;

  @Column({
    default: 0,
    type: 'decimal',
    precision: 30,
    scale: 2,
  })
  amazonPrice: number;

  @Column({ type: 'date', nullable: true })
  amazonDate: Date;

  @Column({
    default: 0,
    type: 'decimal',
    precision: 30,
    scale: 2,
  })
  newMarketplacePrice: number;

  @Column({ type: 'date', nullable: true })
  newMarketplaceDate: Date;

  @Column({
    default: 0,
    type: 'decimal',
    precision: 30,
    scale: 2,
  })
  usedMarketplacePrice: number;

  @Column({ type: 'date', nullable: true })
  usedMarketplaceDate: Date;

  @Column({ type: 'date' })
  scrapedDate: Date;

  @Column()
  country: string;

  @Column()
  resource: string;

  @Column()
  asin: string;

  @Column()
  engine: string;
}
