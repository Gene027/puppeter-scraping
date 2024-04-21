import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'product_prices' })
export class ProductPrice extends Base{
  @Column({ type: 'varchar'})
  title: string;

  @Column({ type: 'varchar'})
  price: string;

  @Column({ type: 'varchar'})
  category: string;

  @Column({ type: 'varchar'})
  subCategory: string;

  @Column({ type: 'varchar'})
  image: string;

  @Column({ type: 'varchar'})
  rating: string;

  @Column({ type: 'varchar'})
  review: string;
}
