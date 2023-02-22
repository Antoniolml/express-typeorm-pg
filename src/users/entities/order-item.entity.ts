import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity extends BaseEntity {
  @Column({ type: 'int' })
  quantity!: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity)
  product!: ProductEntity;
}
