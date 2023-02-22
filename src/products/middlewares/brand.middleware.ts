import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BrandDTO } from '../dtos/brand.dto';

export class BrandMiddleware {
  brandValidator(req: Request, res: Response, next: NextFunction) {
    const { name, image } = req.body;

    const valid = new BrandDTO();
    valid.name = name;
    valid.image = image;

    validate(valid).then((err) => {
      if (err.length > 0) {
        res.status(400).json({ message: 'Invalid data' });
      } else {
        next();
      }
    });
  }
}
