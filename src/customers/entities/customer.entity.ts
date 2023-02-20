import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.dto';
import { OrderEntity } from '../../orders/entities/order.entity';
import { UserEntity } from '../../users/entities/user.entity';

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
