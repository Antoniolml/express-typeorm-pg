import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ProductRouter } from './product/product.router';
import { ConfigServer } from './config/config';

class ServerBoosrap extends ConfigServer {
  public app: express.Application = express();
  public port: number = this.getNumberEnv('PORT') || 3000;

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors());
    this.app.use(morgan('dev'));

    this.app.use('/api', this.routers());
    this.listen();
  }

  routers(): Array<express.Router> {
    return [new ProductRouter().router];
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`);
    });
  }
}

new ServerBoosrap();
