import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService()
  ) {}

  async GetCategories(_req: Request, res: Response) {
    try {
      const categories = await this.categoryService.findAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async GetCategoryById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const category = await this.categoryService.findCategoryById(id);
      if (!category) {
        res.status(404).json({ message: 'category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async CreateCategory(_req: Request, res: Response) {
    try {
      const newCategory = await this.categoryService.createCategory(_req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async UpdateCategory(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const category: UpdateResult = await this.categoryService.updateCategory(
        id,
        _req.body
      );
      if (!category.affected) {
        res.status(404).json({ message: 'category not found' });
      }
      res.status(200).json({ message: 'category updated' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async DeleteCategory(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const category: DeleteResult = await this.categoryService.deleteCategory(
        id
      );
      if (!category.affected) {
        res.status(404).json({ message: 'category not found' });
      }
      res.status(200).json({ message: 'category deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
