import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : ".env",
});

// const Config: DataSourceOptions = {
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT != null ? process.env.DB_PORT : 5402),
//   username: process.env.DB_USER =! null ? process.env.DB_USER : 'postgres',
//   password: process.env.DB_PASSWORD =! null ? process.env.DB_PASSWORD : '1234',
//   database: process.env.DB_DATABASE =! null ? process.env.DB_DATABASE : 'backendtest',
//   schema: process.env.DB_SCHEMA =! null ? process.env.DB_SCHEMA : 'public',
//   // entities: [__dirname + "/../**/*.entity{.ts,.js}"],
//   entities: ["./src/../**/*.entity{.ts,.js}"],
//   // migrations: [__dirname + "/../migrations/*{.ts,.js}"],
//   // synchronize: process.env.DB_SYNC != null ? process.env.DB_SYNC === 'true' : false,
//   migrationsRun: false,
//   logging: process.env.DB_LOGS != null ? process.env.DB_LOGS === 'true' : false,
//   namingStrategy: new SnakeNamingStrategy(),
// };

const Config: DataSourceOptions = {
  type: "postgres",
    host: 'localhost',
    port: Number(5402),
    username: 'postgres',
    password: '1234',
    database: 'backendtest',
    schema: 'public',
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
};

const AppDataSource: DataSource = new DataSource(Config)

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource
