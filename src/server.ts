import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

class ServerBoosrap {
  public app: express.Application = express();
  public port: number = 3000;

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors());
    this.app.use(morgan('dev'));

    this.listen();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port localhost:${this.port}`);
    });
  }
}

new ServerBoosrap();
