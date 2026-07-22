import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.router.js";

const app = express();
const PORT = 8081;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
    res.send("pong");
});


app.use("/api/users", userRouter);

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