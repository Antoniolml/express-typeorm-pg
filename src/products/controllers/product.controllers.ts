import { Request, Response } from 'express';

export class ProductController {
  getProducts(_req: Request, res: Response) {
    res.status(200).json({ message: 'Get products' });
  }
}
