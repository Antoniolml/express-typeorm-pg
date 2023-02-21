import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ProductRouter } from './products/product.router';
import { ConfigServer } from './config/config';
import { DataSource } from 'typeorm';
import { CategoryRouter } from './products/category.router';
import { BrandRouter } from './products/brand.router';

class ServerBoosrap extends ConfigServer {
  public app: express.Application = express();
  public port: number = this.getNumberEnv('PORT') || 3000;

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors());
    this.app.use(morgan('dev'));

    this.dbConnect();

    this.app.use('/api', this.routers());
    this.listen();
  }

  routers(): Array<express.Router> {
    return [
      new ProductRouter().router,
      new CategoryRouter().router,
      new BrandRouter().router,
    ];
  }

  async dbConnect(): Promise<DataSource | void> {
    return await this.initConnect
      .then(() => {
        console.log('Database connected');
      })
      .catch((err) => console.log(err));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`);
    });
  }
}

new ServerBoosrap();
