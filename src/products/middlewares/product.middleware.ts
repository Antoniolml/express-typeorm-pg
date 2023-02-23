import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ProductDTO } from '../dtos/product.dto';

export class ProductMiddleware {
  productValidator(req: Request, res: Response, next: NextFunction) {
    const { name, description, price, stock, image, brand, category } =
      req.body;

    const valid = new ProductDTO();
    valid.name = name;
    valid.description = description;
    valid.price = price;
    valid.stock = stock;
    valid.image = image;
    valid.brand = brand;
    valid.category = category;

    validate(valid).then((err) => {
      if (err.length > 0) {
        console.log(err);
        res.status(400).json({ message: 'Invalid data' });
      } else {
        next();
      }
    });
  }
}
