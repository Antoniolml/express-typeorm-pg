import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.dto';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products!: ProductEntity[];
}
