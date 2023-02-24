import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async GetProducts(_req: Request, res: Response) {
    try {
      const products = await this.productService.findAllProducts();
      if (!products.length) {
        return this.httpResponse.NoContent(res);
      }
      return this.httpResponse.OK(res, products);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async GetProductById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const product = await this.productService.findProductById(id);
      if (!product) {
        return this.httpResponse.NotFound(res, {
          message: 'Product not found',
        });
      }
      return this.httpResponse.OK(res, product);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async CreateProduct(_req: Request, res: Response) {
    try {
      const newProduct = await this.productService.createProduct(_req.body);
      return this.httpResponse.Created(res, newProduct);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
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
        return this.httpResponse.NotFound(res, {
          message: 'There is an error updating',
        });
      }
      return this.httpResponse.OK(res, product);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async DeleteProduct(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const product: DeleteResult = await this.productService.deleteProduct(id);
      if (!product.affected) {
        return this.httpResponse.NotFound(res, {
          message: "Product doesn't exist",
        });
      }
      return this.httpResponse.OK(res, product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
