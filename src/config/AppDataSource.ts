import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
const dotenv = require('dotenv');
dotenv.config({ path: '../env' });

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export {AppDataSource};