import express from "express";
import routerProducts from "./routes/router.products.js";

const app = express();
const PORT = 8081;


app.use("/api", routerProducts);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
