import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrderEntity } from '../dtos/order.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'customers' })
export class CustomerEntity extends BaseEntity {
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  lastName!: string;

  @Column({ type: 'varchar', length: 255 })
  phone!: string;

  @OneToOne(() => UserEntity, (user) => user.customer)
  user!: string;

  @ManyToOne(() => UserEntity, (order) => order.customer)
  order!: OrderEntity;
}
