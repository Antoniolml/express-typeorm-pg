import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { ProductDTO } from '../dtos/product.dto';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    return (await this.execRepository).find();
  }

  async findCategoryById(id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createCategory(body: ProductDTO): Promise<CategoryEntity> {
    const newProduct = (await this.execRepository).create(body);
    return (await this.execRepository).save(newProduct);
  }

  async updateCategory(
    id: string,
    infoUpdate: ProductDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
