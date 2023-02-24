import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { OdererItemService } from '../services/order-item.service';

export class OrderItemController {
  constructor(
    private readonly orderItemService: OdererItemService = new OdererItemService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async GetOrderItem(_req: Request, res: Response) {
    try {
      const OrderItem = await this.orderItemService.findAllOrdersItem();
      if (!OrderItem.length) {
        return this.httpResponse.NoContent(res);
      }
      return this.httpResponse.OK(res, OrderItem);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async GetOrderItemById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const OrderItem = await this.orderItemService.findOrderItemById(id);
      if (!OrderItem) {
        return this.httpResponse.NotFound(res, {
          message: 'OrderItem not found',
        });
      }
      return this.httpResponse.OK(res, OrderItem);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async CreateOrderItem(_req: Request, res: Response) {
    try {
      const newOrderItem = await this.orderItemService.createOrderItem(
        _req.body
      );
      return this.httpResponse.Created(res, newOrderItem);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async UpdateOrderItem(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const OrderItem: UpdateResult =
        await this.orderItemService.updateOrderItem(id, _req.body);
      if (!OrderItem.affected) {
        return this.httpResponse.NotFound(res, {
          message: 'There is an error updating',
        });
      }
      return this.httpResponse.OK(res, OrderItem);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async DeleteOrderItem(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const OrderItem: DeleteResult =
        await this.orderItemService.deleteOrderItem(id);
      if (!OrderItem.affected) {
        return this.httpResponse.NotFound(res, {
          message: "OrderItem doesn't exist",
        });
      }
      return this.httpResponse.OK(res, OrderItem);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }
}
