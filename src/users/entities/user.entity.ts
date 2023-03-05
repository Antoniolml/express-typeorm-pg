import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { RoleType } from '../dtos/user.dto';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  userName!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ type: 'varchar', length: 255 })
  city!: string;

  @Column({ type: 'varchar', length: 255 })
  province!: string;

  @Column({ type: 'enum', enum: RoleType, nullable: false })
  role!: RoleType;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
}
