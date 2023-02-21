import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BrandService } from '../services/brand.service';

export class BrandController {
  constructor(
    private readonly brandService: BrandService = new BrandService()
  ) {}

  async GetBrands(_req: Request, res: Response) {
    try {
      const Brands = await this.brandService.findAllBrands();
      res.status(200).json(Brands);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async GetBrandById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Brand = await this.brandService.findBrandsById(id);
      if (!Brand) {
        res.status(404).json({ message: 'Brand not found' });
      }
      res.status(200).json(Brand);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async CreateBrand(_req: Request, res: Response) {
    try {
      const newBrand = await this.brandService.createBrands(_req.body);
      res.status(201).json(newBrand);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
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
        res.status(404).json({ message: 'Brand not found' });
      }
      res.status(200).json({ message: 'Brand updated' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async DeleteBrand(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const Brand: DeleteResult = await this.brandService.deleteBrands(id);
      if (!Brand.affected) {
        res.status(404).json({ message: 'Brand not found' });
      }
      res.status(200).json({ message: 'Brand deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
