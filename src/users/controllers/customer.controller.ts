import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { CustomerService } from '../services/customer.service';

export class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async GetCustomers(_req: Request, res: Response) {
    try {
      const customers = await this.customerService.findAllCustomers();
      if (!customers.length) {
        return this.httpResponse.NoContent(res);
      }
      return this.httpResponse.OK(res, customers);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async GetCustomerById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Customer = await this.customerService.findCustomerById(id);
      if (!Customer) {
        return this.httpResponse.NotFound(res, {
          message: 'Customer not found',
        });
      }
      return this.httpResponse.OK(res, Customer);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async CreateCustomer(_req: Request, res: Response) {
    try {
      const newCustomer = await this.customerService.createcustomer(_req.body);
      return this.httpResponse.Created(res, newCustomer);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async UpdateCustomer(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Customer: UpdateResult = await this.customerService.updateCustomer(
        id,
        _req.body
      );
      if (!Customer.affected) {
        return this.httpResponse.NotFound(res, {
          message: 'There is an error updating',
        });
      }
      return this.httpResponse.OK(res, Customer);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async DeleteCustomer(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Customer: DeleteResult = await this.customerService.deleteCustomer(
        id
      );
      if (!Customer.affected) {
        return this.httpResponse.NotFound(res, {
          message: "Customer doesn't exist",
        });
      }
      return this.httpResponse.OK(res, Customer);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }
}
