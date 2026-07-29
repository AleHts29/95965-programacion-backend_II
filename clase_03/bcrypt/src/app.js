import express from "express";
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import handlebars from "express-handlebars";
import session from "express-session"
import FileStore from "session-file-store"


import userRouter from "./routes/user.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from './routes/sessions.router.js'
import usersViewRouter from './routes/users.views.router.js';
import __dirname from "./utils.js";

const app = express();
const PORT = 8081;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// configuracion de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + '/public'));

const MONGO_URI = "mongodb://localhost:27017/clase_01?retryWrites=true&w=majority"; // Replace with your MongoDB connection string


// const fileStorage = FileStore(session)

// 2da parte - Session initialization
app.use(session({
    //ttl: Time to live in seconds,
    //retries: Reintentos para que el servidor lea el archivo del storage.
    //path: Ruta a donde se buscará el archivo del session store.

    // store: new fileStorage({ path: "./sessions", ttl: 40, retries: 3 }), // sesion en File



    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10
    }),
    secret: "coderS3cr3t",
    resave: false, //guarda en memoria
    saveUninitialized: true, //lo guarda a penas se crea
}))



app.get("/ping", (req, res) => {
    res.send("pong");
});


app.use("/api/users", userRouter);
app.use("/", viewsRouter);

app.use("/api/sessions", sessionsRouter); // <-- contiene las APIs de Register y Login
app.use("/users", usersViewRouter); // <-- Esto renderiza las plantillas(Front)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


// DB Connection

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
connectMongoDB();