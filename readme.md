
La base de datos debe ser restaurada usando el archivo 0_database.sql

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