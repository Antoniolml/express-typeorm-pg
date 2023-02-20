import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.dto';
import { OrderEntity } from '../../orders/entities/order.entity';
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
