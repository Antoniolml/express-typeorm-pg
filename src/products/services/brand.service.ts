import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { ProductDTO } from '../dtos/product.dto';
import { BrandEntity } from '../entities/brand.entity';

export class BrandService extends BaseService<BrandEntity> {
  constructor() {
    super(BrandEntity);
  }

  async findAllBrands(): Promise<BrandEntity[]> {
    return (await this.execRepository).find();
  }

  async findBrandsById(id: string): Promise<BrandEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createBrands(body: ProductDTO): Promise<BrandEntity> {
    const newProduct = (await this.execRepository).create(body);
    return (await this.execRepository).save(newProduct);
  }

  async updateBrands(
    id: string,
    infoUpdate: ProductDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async deleteBrands(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
