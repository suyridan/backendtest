La base de datos debe ser restaurada usando el archivo backendtest_v1.backup desde el repositorio o correo electrónico.

La aplicación puede ser ejecutada a partir del comando en su modo producción:
docker-compose up -d

Para su ejecusión en ambiente de desarrollo es necesario ejecutar:
npm install

y de manera subsecuente:
npm run dev

Endpoint de autenticación siguiendo la estructura 
POST /login
{
    "username": "albertohs",
    "password": 123456
}
a partir de la cual se retorna el atributo token que será usado para permitir el acceso al siguiente Endpoint

POST /getPagos 
Authorization bearer
{
    "fecha_actual": "2021-02-20",
    "tasa_interes": 7.50,
    "dias_anio_comercial": 360
}

GET /getMenu


Para la ejecución de pruebas:
npm run test