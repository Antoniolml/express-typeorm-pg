import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async GetCategories(_req: Request, res: Response) {
    try {
      const categories = await this.categoryService.findAllCategories();
      if (!categories.length) {
        return this.httpResponse.NoContent(res);
      }
      return this.httpResponse.OK(res, categories);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async GetCategoryById(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const category = await this.categoryService.findCategoryById(id);
      if (!category) {
        return this.httpResponse.NotFound(res, {
          message: 'category not found',
        });
      }
      return this.httpResponse.OK(res, category);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async CreateCategory(_req: Request, res: Response) {
    try {
      const newCategory = await this.categoryService.createCategory(_req.body);
      return this.httpResponse.Created(res, newCategory);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
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
        return this.httpResponse.NotFound(res, {
          message: 'There is an error updating',
        });
      }
      return this.httpResponse.OK(res, category);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }

  async DeleteCategory(_req: Request, res: Response) {
    const { id } = _req.params;
    try {
      const category: DeleteResult = await this.categoryService.deleteCategory(
        id
      );
      if (!category.affected) {
        return this.httpResponse.NotFound(res, {
          message: 'There is an error updating',
        });
      }
      return this.httpResponse.OK(res, category);
    } catch (error) {
      console.log(error);
      return this.httpResponse.InternalServerError(res, error);
    }
  }
}
