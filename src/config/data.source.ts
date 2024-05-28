import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : ".env",
});

const Config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  // migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  // synchronize: process.env.DB_SYNC != null ? process.env.DB_SYNC === 'true' : false,
  migrationsRun: false,
  logging: process.env.DB_LOGS != null ? process.env.DB_LOGS === 'true' : false,
  namingStrategy: new SnakeNamingStrategy(),
};

const AppDataSource: DataSource = new DataSource(Config)

export default AppDataSource
