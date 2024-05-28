import app from "./app";
import AppDataSource from "./config/data.source";

// Read the port from environment variables or use a default port
const port = process.env.PORT || 3001;
// if(process.env.NODE_ENV != 'test'){
AppDataSource.initialize()
// }
// Start the server

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;