import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {}

  async GetProducts(_req: Request, res: Response) {
    try {
      const products = await this.productService.findAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async GetProductById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const product = await this.productService.findProductById(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async CreateProduct(_req: Request, res: Response) {
    try {
      const newProduct = await this.productService.createProduct(_req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async UpdateProduct(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const product: UpdateResult = await this.productService.updateProduct(
        id,
        _req.body
      );
      if (!product.affected) {
        res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product updated' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async DeleteProduct(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const product: DeleteResult = await this.productService.deleteProduct(id);
      if (!product.affected) {
        res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
