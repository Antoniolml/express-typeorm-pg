import { Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.dto';
import { CustomerEntity } from '../../customers/entities/customer.entity';
import { OrderItemEntity } from '../../order-items/entities/order-item.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @ManyToMany(() => CustomerEntity, (customer) => customer.order)
  customer!: CustomerEntity;

  @ManyToMany(() => OrderItemEntity, (item) => item.order)
  items!: OrderItemEntity[];
}
