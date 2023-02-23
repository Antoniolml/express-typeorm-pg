import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerService } from '../services/customer.service';

export class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService()
  ) {}

  async GetCustomers(_req: Request, res: Response) {
    try {
      const customers = await this.customerService.findAllCustomers();
      res.status(200).json(customers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async GetCustomerById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Customer = await this.customerService.findCustomerById(id);
      if (!Customer) {
        res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json(Customer);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async CreateCustomer(_req: Request, res: Response) {
    try {
      const newCustomer = await this.customerService.createcustomer(_req.body);
      res.status(201).json(newCustomer);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
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
        res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer updated' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async DeleteCustomer(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Customer: DeleteResult = await this.customerService.deleteCustomer(
        id
      );
      if (!Customer.affected) {
        res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
