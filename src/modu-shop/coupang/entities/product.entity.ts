import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  productId: string;

  @Column()
  productName: string;

  @Column({
    default: '',
  })
  description: string;

  @Column({
    type: 'float',
    default: 0,
  })
  discountRate: number;

  @Column({
    default: '',
  })
  vendorItemId: string;

  @Column({
    default: '',
  })
  itemId: string;

  @Column()
  productPrice: number;

  @Column()
  productImage: string;

  @Column()
  productUrl: string;

  @Column()
  categoryName: string;

  @Column()
  keyword: string;

  @Column()
  rank: number;

  @Column()
  isRocket: boolean;

  @Column()
  isFreeShipping: boolean;

  @Column({
    default: 0,
    type: 'float',
  })
  ratingValue: number;

  @Column({
    default: 0,
  })
  ratingCount: number;

  @Column({ type: 'json', default: [] })
  imageUrls: string[];
}
