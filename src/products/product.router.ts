import { BaseRouter } from '../shared/router/router';
import { ProductController } from './controllers/product.controllers';
import { ProductMiddleware } from './middlewares/product.middleware';

export class ProductRouter extends BaseRouter<
  ProductController,
  ProductMiddleware
> {
  constructor() {
    super(ProductController, ProductMiddleware);
  }

  routes(): void {
    this.router.get('/products', (req, res) =>
      this.controller.GetProducts(req, res)
    );
    this.router.get('/products/:id', (req, res) =>
      this.controller.GetProductById(req, res)
    );
    this.router.post(
      '/products',
      (req, res, next) => [this.middleware.productValidator(req, res, next)],
      (req, res) => this.controller.CreateProduct(req, res)
    );
    this.router.put('/products/:id', (req, res) =>
      this.controller.UpdateProduct(req, res)
    );
    this.router.delete('/products/:id', (req, res) =>
      this.controller.DeleteProduct(req, res)
    );
  }
}
