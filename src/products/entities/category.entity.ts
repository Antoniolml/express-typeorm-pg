import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products!: ProductEntity[];
}
