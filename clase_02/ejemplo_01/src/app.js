import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import session from "express-session"


import userRouter from "./routes/user.router.js";
import viewsRouter from "./routes/views.router.js";
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


// 2da parte - Session initialization
app.use(session({
    secret: "coderS3cr3t",
    resave: true,
    saveUninitialized: true
}))



app.get("/ping", (req, res) => {
    res.send("pong");
});


app.use("/api/users", userRouter);
app.use("/", viewsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


// DB Connection
const MONGO_URI = "mongodb://localhost:27017/clase_01?retryWrites=true&w=majority"; // Replace with your MongoDB connection string
const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
connectMongoDB();