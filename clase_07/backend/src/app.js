import express from "express";
import cors from 'cors'
import MongoSingleton from "./config/mongodb-singleton.js";
import config from "./config/config.js";

//Routers a importar:
import studentRouter from './routes/students.router.js'
import coursesRouter from './routes/courses.router.js'

const app = express();
const PORT = config.port || 8081;


//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()) // habilitamos los cors


//Declaración de Routers:
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);



app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// DB Conection - singleton
const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with an error code
    }
}
mongoInstance();