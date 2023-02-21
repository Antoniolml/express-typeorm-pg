import { Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { OrderItemEntity } from '../entities/order-item.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @ManyToMany(() => CustomerEntity, (customer) => customer.order)
  customer!: CustomerEntity;

  @ManyToMany(() => OrderItemEntity, (item) => item.order)
  items!: OrderItemEntity[];
}
