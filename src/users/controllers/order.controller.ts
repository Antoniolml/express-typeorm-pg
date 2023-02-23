import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { OdererService } from '../services/order.service';

export class OrderController {
  constructor(
    private readonly orderService: OdererService = new OdererService()
  ) {}

  async GetOrders(_req: Request, res: Response) {
    try {
      const Orders = await this.orderService.findAllOrders();
      res.status(200).json(Orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async GetOrderById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Order = await this.orderService.findOrderById(id);
      if (!Order) {
        res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(Order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async CreateOrder(_req: Request, res: Response) {
    try {
      const newOrder = await this.orderService.createOrder(_req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async UpdateOrder(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Order: UpdateResult = await this.orderService.updateOrder(
        id,
        _req.body
      );
      if (!Order.affected) {
        res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order updated' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async DeleteOrder(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Order: DeleteResult = await this.orderService.deleteOrder(id);
      if (!Order.affected) {
        res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
