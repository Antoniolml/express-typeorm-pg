import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CustomerDTO } from '../dtos/customer.dto';

import { OrderEntity } from '../entities/order.entity';

export class OdererService extends BaseService<OrderEntity> {
  constructor() {
    super(OrderEntity);
  }

  async findAllOrders(): Promise<OrderEntity[]> {
    return (await this.execRepository).find();
  }

  async findOrderById(id: string): Promise<OrderEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createOrder(body: CustomerDTO): Promise<OrderEntity> {
    const newProduct = (await this.execRepository).create(body);
    return (await this.execRepository).save(newProduct);
  }

  async updateOrder(
    id: string,
    infoUpdate: CustomerDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async deleteOrder(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
