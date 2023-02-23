import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';
import { BaseEntity } from '../../config/base.entity';
import { OrderItemEntity } from '../../users/entities/order-item.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'int' })
  price!: number;

  @Column({ type: 'int' })
  stock!: number;

  @Column({ type: 'varchar' })
  image!: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand!: BrandEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinTable({ name: 'category_id' })
  category!: CategoryEntity;

  @ManyToMany(() => OrderItemEntity, (OrderItem) => OrderItem.product)
  orderItems!: OrderItemEntity[];
}
