import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.dto';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'brands' })
export class BrandEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  image!: string;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products!: ProductEntity[];
}
