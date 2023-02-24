import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { OdererService } from '../services/order.service';

export class OrderController {
  constructor(
    private readonly orderService: OdererService = new OdererService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async GetOrders(_req: Request, res: Response) {
    try {
      const Orders = await this.orderService.findAllOrders();
      if (!Orders.length) {
        return this.httpResponse.NoContent(res);
      }
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async GetOrderById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Order = await this.orderService.findOrderById(id);
      if (!Order) {
        return this.httpResponse.NotFound(res, {
          message: 'Order not found',
        });
      }
      return this.httpResponse.OK(res, Order);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async CreateOrder(_req: Request, res: Response) {
    try {
      const newOrder = await this.orderService.createOrder(_req.body);
      return this.httpResponse.Created(res, newOrder);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
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
        return this.httpResponse.NotFound(res, {
          message: 'There is an error updating',
        });
      }
      return this.httpResponse.OK(res, Order);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async DeleteOrder(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Order: DeleteResult = await this.orderService.deleteOrder(id);
      if (!Order.affected) {
        return this.httpResponse.NotFound(res, {
          message: 'Order not found',
        });
      }
      return this.httpResponse.OK(res, Order);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }
}
