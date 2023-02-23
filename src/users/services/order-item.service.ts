import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { ProductService } from '../../products/services/product.service';
import { OrderItemDTO } from '../dtos/order-item.dto';
import { OrderItemEntity } from '../entities/order-item.entity';

export class OdererItemService extends BaseService<OrderItemEntity> {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {
    super(OrderItemEntity);
  }

  async findAllOrdersItem(): Promise<OrderItemEntity[]> {
    return (await this.execRepository).find();
  }

  async findOrderItemById(id: string): Promise<OrderItemEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createOrderItem(body: OrderItemDTO): Promise<OrderItemEntity> {
    const newPP = (await this.execRepository).create(body);
    const prod = await this.productService.findProductById(newPP.product?.id);
    newPP.totalPrice = prod!.price * newPP.quantity;
    return (await this.execRepository).save(newPP);
  }

  async updateOrderItem(
    id: string,
    infoUpdate: OrderItemDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async deleteOrderItem(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
