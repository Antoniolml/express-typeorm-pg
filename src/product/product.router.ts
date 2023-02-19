import { BaseRouter } from '../shared/router/router';
import { ProductController } from './controllers/product.controllers';

export class ProductRouter extends BaseRouter<ProductController> {
  constructor() {
    super(ProductController);
  }

  routes(): void {
    this.router.get('/products', (req, res) =>
      this.controller.getProducts(req, res)
    );
  }
}
