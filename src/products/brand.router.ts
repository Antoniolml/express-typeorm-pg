import { BaseRouter } from '../shared/router/router';
import { BrandController } from './controllers/brand.controller';
import { BrandMiddleware } from './middlewares/brand.middleware';

export class BrandRouter extends BaseRouter<BrandController, BrandMiddleware> {
  constructor() {
    super(BrandController, BrandMiddleware);
  }

  routes(): void {
    this.router.get('/brands', (req, res) =>
      this.controller.GetBrands(req, res)
    );
    this.router.get('/brands/:id', (req, res) =>
      this.controller.GetBrandById(req, res)
    );
    this.router.post(
      '/brands',
      (req, res, next) => [this.middleware.brandValidator(req, res, next)],
      (req, res) => this.controller.CreateBrand(req, res)
    );
    this.router.put('/brands/:id', (req, res) =>
      this.controller.UpdateBrand(req, res)
    );
    this.router.delete('/brands/:id', (req, res) =>
      this.controller.DeleteBrand(req, res)
    );
  }
}
