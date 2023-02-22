import { Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { CustomerEntity } from './customer.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @ManyToMany(() => CustomerEntity, (customer) => customer.order)
  customer!: CustomerEntity;

  @ManyToMany(() => OrderItemEntity, (item) => item.order)
  items!: OrderItemEntity[];
}
