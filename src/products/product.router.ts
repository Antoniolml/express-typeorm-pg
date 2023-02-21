import { BaseRouter } from '../shared/router/router';
import { ProductController } from './controllers/product.controllers';

export class ProductRouter extends BaseRouter<ProductController> {
  constructor() {
    super(ProductController);
  }

  routes(): void {
    this.router.get('/products', (req, res) =>
      this.controller.GetProducts(req, res)
    );
    this.router.get('/products/:id', (req, res) =>
      this.controller.GetProductById(req, res)
    );
    this.router.post('/products', (req, res) =>
      this.controller.CreateProduct(req, res)
    );
    this.router.put('/products/:id', (req, res) =>
      this.controller.UpdateProduct(req, res)
    );
    this.router.delete('/products/:id', (req, res) =>
      this.controller.DeleteProduct(req, res)
    );
  }
}
