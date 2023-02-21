import { BaseRouter } from '../shared/router/router';
import { BrandController } from './controllers/brand.controller';

export class BrandRouter extends BaseRouter<BrandController> {
  constructor() {
    super(BrandController);
  }

  routes(): void {
    this.router.get('/brands', (req, res) =>
      this.controller.GetBrands(req, res)
    );
    this.router.get('/brands/:id', (req, res) =>
      this.controller.GetBrandById(req, res)
    );
    this.router.post('/brands', (req, res) =>
      this.controller.CreateBrand(req, res)
    );
    this.router.put('/brands/:id', (req, res) =>
      this.controller.UpdateBrand(req, res)
    );
    this.router.delete('/brands/:id', (req, res) =>
      this.controller.DeleteBrand(req, res)
    );
  }
}
