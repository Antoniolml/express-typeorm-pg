import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { OdererItemService } from '../services/order-item.service';

export class OrderItemController {
  constructor(
    private readonly orderItemService: OdererItemService = new OdererItemService()
  ) {}

  async GetOrderItem(_req: Request, res: Response) {
    try {
      const OrderItem = await this.orderItemService.findAllOrdersItem();
      res.status(200).json(OrderItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async GetOrderItemById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const OrderItem = await this.orderItemService.findOrderItemById(id);
      if (!OrderItem) {
        res.status(404).json({ message: 'OrderItem not found' });
      }
      res.status(200).json(OrderItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async CreateOrderItem(_req: Request, res: Response) {
    try {
      const newOrderItem = await this.orderItemService.createOrderItem(
        _req.body
      );
      res.status(201).json(newOrderItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async UpdateOrderItem(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const OrderItem: UpdateResult =
        await this.orderItemService.updateOrderItem(id, _req.body);
      if (!OrderItem.affected) {
        res.status(404).json({ message: 'OrderItem not found' });
      }
      res.status(200).json({ message: 'OrderItem updated' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async DeleteOrderItem(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const OrderItem: DeleteResult =
        await this.orderItemService.deleteOrderItem(id);
      if (!OrderItem.affected) {
        res.status(404).json({ message: 'OrderItem not found' });
      }
      res.status(200).json({ message: 'OrderItem deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
