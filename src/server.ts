import "reflect-metadata";
import express from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import { ConfigServer } from "./config/config";
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc"
import { options } from "./swaggerOptions"
import { AccountRouter } from "./objects/account/account.router";
import { userRouter } from "./objects/auth/auth.router";
import morgan from "morgan";

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv("PORT");

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.dbConnect();
    this.app.use(morgan("dev"));
    
    this.app.use(
      cors({
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
      })
      );
    this.app.use("/auth", userRouter);
    this.app.use("/api", this.routers());
    
    const specs = swaggerJSDoc(options)
    this.app.use('/docs', 
      swaggerUI.serve, 
      swaggerUI.setup(specs)
    )
    this.listen();
  }

  routers(): Array<express.Router> {
    return [
      new AccountRouter().router,
    ];
  }
  
  async dbConnect(): Promise<DataSource | void> {

    return this.initConnect
      .then(() => {
        console.log("Connect Success");
      })
      .catch((err) => {
        console.error(err);
      });
      
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Listen in ${this.port} :: ENV = ${this.getEnvironment("ENV")}`
      );
    });
  }
}

new ServerBootstrap();
