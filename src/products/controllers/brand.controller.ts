import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { BrandService } from '../services/brand.service';

export class BrandController {
  constructor(
    private readonly brandService: BrandService = new BrandService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async GetBrands(_req: Request, res: Response) {
    try {
      const Brands = await this.brandService.findAllBrands();

      if (!Brands.length) {
        return this.httpResponse.NoContent(res);
      }
      return this.httpResponse.OK(res, Brands);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async GetBrandById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Brand = await this.brandService.findBrandsById(id);
      if (!Brand) {
        return this.httpResponse.NotFound(res, { message: 'Brand not found' });
      }
      return this.httpResponse.OK(res, Brand);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async CreateBrand(_req: Request, res: Response) {
    try {
      const newBrand = await this.brandService.createBrands(_req.body);
      return this.httpResponse.Created(res, newBrand);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async UpdateBrand(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Brand: UpdateResult = await this.brandService.updateBrands(
        id,
        _req.body
      );
      if (!Brand.affected) {
        return this.httpResponse.NotFound(res, {
          message: 'There is an error updating',
        });
      }
      return this.httpResponse.OK(res, Brand);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async DeleteBrand(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Brand: DeleteResult = await this.brandService.deleteBrands(id);
      if (!Brand.affected) {
        return this.httpResponse.NotFound(res, { message: 'Brand not found' });
      }
      return this.httpResponse.OK(res, Brand);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }
}
