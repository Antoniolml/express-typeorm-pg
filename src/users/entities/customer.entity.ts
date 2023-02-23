import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'customers' })
export class CustomerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  address!: string;

  @Column({ type: 'int' })
  dni!: number;

  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  order!: OrderEntity[];
}
