import app from "./app";
import AppDataSource from "./config/data.source";

// Se setea puerto para el servidor
const port = process.env.PORT || 3001;


const server = app.listen(port, async () => {
    AppDataSource
        .initialize()
        .then(() => {
            console.log("Se ha conectado a la DB")
        })
        .catch((err) => {
            console.error("Error en conexión a la BD:", err)
        })
    console.log(`Servidor corriendo en el puerto: ${port}`);
});

module.exports = server;