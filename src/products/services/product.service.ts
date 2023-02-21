import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { ProductDTO } from '../dtos/product.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductService extends BaseService<ProductEntity> {
  constructor() {
    super(ProductEntity);
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return (await this.execRepository).find();
  }

  async findProductById(id: string): Promise<ProductEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createProduct(body: ProductDTO): Promise<ProductEntity> {
    const newProduct = (await this.execRepository).create(body);
    return (await this.execRepository).save(newProduct);
  }

  async updateProduct(
    id: string,
    infoUpdate: ProductDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
