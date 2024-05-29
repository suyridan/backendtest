import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

const AppDataSource = new DataSource({
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
})


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export {AppDataSource};