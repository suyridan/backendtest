import * as dotenv from "dotenv";

dotenv.config({
    path:
      process.env.NODE_ENV !== undefined
        ? `.${process.env.NODE_ENV.trim()}.env`
        : ".env",
  });

export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Api pagos',
            version: '1.0.0',
            description: "Microservicio api pagos",
        },
        servers: [
            {
                url: `${process.env.HOST}${ (process.env.PORT != '80' ? ':' + process.env.PORT : '' ) }`
            }
        ]
    },
    apis: [process.env.ENV == 'production'?"./dist/objects/**/*router.js": "./src/objects/**/*router.ts*"]
}