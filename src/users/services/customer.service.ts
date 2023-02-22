import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CustomerDTO } from '../dtos/customer.dto';

import { CustomerEntity } from '../entities/customer.entity';

export class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async findAllCustomers(): Promise<CustomerEntity[]> {
    return (await this.execRepository).find();
  }

  async findCustomerById(id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async createcustomer(body: CustomerDTO): Promise<CustomerEntity> {
    const newProduct = (await this.execRepository).create(body);
    return (await this.execRepository).save(newProduct);
  }

  async updateCustomer(
    id: string,
    infoUpdate: CustomerDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async deleteCustomer(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
