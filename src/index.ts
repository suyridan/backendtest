import app from "./app";

// Se setea puerto para el servidor
const port = process.env.PORT || 3001;

const server = app.listen(port, async () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});

module.exports = server;