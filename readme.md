# BackendTest
## Inicialización
La base de datos debe ser restaurada usando el archivo backendtest_v1.backup desde el repositorio o correo electrónico.

Setteo de variables de entorno en .env

    PORT=3001
    ENV=develop
    HOST="http://localhost"
    DB_PORT=5402
    DB_HOST=localhost
    DB_DATABASE=backendtest
    DB_USER=postgres
    DB_PASSWORD=1234
    DB_SCHEMA=public

La aplicación puede ser ejecutada a partir del comando en su modo producción: 

    docker-compose up -d

Para su ejecusión en ambiente de desarrollo es necesario ejecutar: npm install

    npm install

y de manera subsecuente: npm run dev

    npm run dev

Endpoint de autenticación siguiendo la estructura POST /login { "username": "albertohs", "password": 123456 } a partir de la cual se retorna el atributo token que será usado para permitir el acceso al siguiente Endpoint

POST /getPagos 
Authorization: bearer token

    { "fecha_actual": "2021-02-20", "tasa_interes": 7.50, "dias_anio_comercial": 360 }

GET /getMenu

Endpoint de Registro de nuevo usuario:
POST /auth/singup 

    { "username": "albertohs", "email": "hernandezsalberto@gmail.com", "password": "123456", "role": "admin" }


Para la ejecución de pruebas: 

    npm run test
